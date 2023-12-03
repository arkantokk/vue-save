<template>
  <div class="flex flex-col items-center relative">
    <div>
      <svg width="2500" height="848" viewBox="0 0 1880 848" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
              v-for="circle in circles" :key="circle.id"
              :cx="circle.cx"
              :cy="circle.cy"
              :r="circle.r"
              :fill="circle.fill"
              @click="chooseCircle(circle)"
          />
      </svg>
    </div>
      <div class="">
      <svg width="1300" height="86" viewBox="0 0 1300 86" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.47403 72.2614C512.253 -21.0054 787.268 -25.6523 1299.49 72.2614" stroke="#797979"/>
<path d="M559.512 76.215C554.732 76.215 550.757 75.3317 547.587 73.565C544.47 71.7984 542.105 69.3303 540.495 66.1607C538.884 62.9911 538.001 59.3019 537.845 55.0931C537.793 52.9627 537.767 50.6765 537.767 48.2343C537.767 45.7922 537.793 43.454 537.845 41.2197C538.001 37.0109 538.884 33.3217 540.495 30.1521C542.105 26.9825 544.47 24.5144 547.587 22.7477C550.757 20.9811 554.732 20.0977 559.512 20.0977C563.098 20.0977 566.241 20.5914 568.943 21.5786C571.645 22.5659 573.879 23.8909 575.646 25.5536C577.465 27.2163 578.842 29.0869 579.777 31.1653C580.712 33.1918 581.232 35.2962 581.336 37.4785C581.388 37.9462 581.232 38.3359 580.868 38.6476C580.556 38.9594 580.167 39.1153 579.699 39.1153H575.412C574.944 39.1153 574.529 38.9854 574.165 38.7256C573.853 38.4658 573.62 37.9981 573.464 37.3226C572.58 33.2697 570.918 30.4898 568.475 28.983C566.085 27.4761 563.072 26.7227 559.434 26.7227C555.277 26.7227 551.978 27.9178 549.536 30.308C547.094 32.6462 545.769 36.4133 545.561 41.6094C545.405 45.8701 545.405 50.2348 545.561 54.7034C545.769 59.8994 547.094 63.6926 549.536 66.0827C551.978 68.421 555.277 69.5901 559.434 69.5901C563.072 69.5901 566.085 68.8366 568.475 67.3298C570.918 65.8229 572.58 63.043 573.464 58.9901C573.62 58.3146 573.853 57.847 574.165 57.5872C574.529 57.3274 574.944 57.1975 575.412 57.1975H579.699C580.167 57.1975 580.556 57.3534 580.868 57.6651C581.232 57.9769 581.388 58.3666 581.336 58.8342C581.232 61.0166 580.712 63.147 579.777 65.2254C578.842 67.2518 577.465 69.0964 575.646 70.7592C573.879 72.4219 571.645 73.7469 568.943 74.7341C566.241 75.7214 563.098 76.215 559.512 76.215ZM625.295 85.2561C624.724 85.2561 624.282 85.1002 623.97 84.7885C623.659 84.4767 623.503 84.0351 623.503 83.4635V75.4356H592.56C592.041 75.4356 591.599 75.2797 591.235 74.968C590.924 74.6042 590.768 74.1626 590.768 73.643V36.6991C590.768 36.1795 590.924 35.7638 591.235 35.4521C591.599 35.0883 592.041 34.9065 592.56 34.9065H596.302C596.821 34.9065 597.237 35.0883 597.549 35.4521C597.86 35.7638 598.016 36.1795 598.016 36.6991V69.2004H618.047V36.6991C618.047 36.1795 618.203 35.7638 618.515 35.4521C618.826 35.0883 619.242 34.9065 619.762 34.9065H623.503C624.022 34.9065 624.438 35.0883 624.75 35.4521C625.114 35.7638 625.295 36.1795 625.295 36.6991L625.218 69.2004H628.959C629.478 69.2004 629.894 69.3822 630.206 69.7459C630.569 70.0577 630.751 70.4734 630.751 70.993V83.4635C630.751 84.0351 630.569 84.4767 630.206 84.7885C629.894 85.1002 629.478 85.2561 628.959 85.2561H625.295ZM655.003 76.215C649.651 76.215 645.39 74.5783 642.223 71.3048C639.053 67.9793 637.313 63.4587 637.001 57.7431C636.949 57.0676 636.923 56.2102 636.923 55.171C636.923 54.0799 636.949 53.1965 637.001 52.5211C637.209 48.8319 638.066 45.6103 639.573 42.8564C641.08 40.0506 643.132 37.8942 645.728 36.3873C648.378 34.8805 651.469 34.1271 655.003 34.1271C658.952 34.1271 662.251 34.9584 664.901 36.6212C667.603 38.2839 669.655 40.6481 671.058 43.7138C672.461 46.7794 673.163 50.3647 673.163 54.4696V55.7946C673.163 56.3661 672.981 56.8078 672.617 57.1196C672.305 57.4313 671.89 57.5872 671.37 57.5872H644.403C644.403 57.6392 644.403 57.7431 644.403 57.899C644.403 58.0548 644.403 58.1847 644.403 58.2887C644.507 60.419 644.974 62.4195 645.806 64.2901C646.637 66.1087 647.832 67.5896 649.391 68.7327C650.95 69.8758 652.82 70.4474 655.003 70.4474C656.873 70.4474 658.432 70.1616 659.679 69.5901C660.926 69.0185 661.939 68.395 662.719 67.7195C663.498 66.992 664.018 66.4465 664.277 66.0827C664.745 65.4072 665.109 65.0175 665.369 64.9136C665.628 64.7577 666.044 64.6798 666.616 64.6798H670.357C670.877 64.6798 671.292 64.8357 671.604 65.1474C671.968 65.4072 672.124 65.7969 672.072 66.3165C672.02 67.096 671.604 68.0572 670.825 69.2004C670.045 70.2915 668.928 71.3827 667.473 72.4739C666.018 73.565 664.252 74.4743 662.173 75.2018C660.095 75.8773 657.704 76.215 655.003 76.215ZM644.403 52.2093H665.758V51.9755C665.758 49.6372 665.317 47.5588 664.433 45.7402C663.602 43.9216 662.381 42.4927 660.77 41.4535C659.159 40.3623 657.237 39.8167 655.003 39.8167C652.768 39.8167 650.846 40.3623 649.235 41.4535C647.676 42.4927 646.481 43.9216 645.65 45.7402C644.818 47.5588 644.403 49.6372 644.403 51.9755V52.2093ZM684.276 75.4356C683.756 75.4356 683.315 75.2797 682.951 74.968C682.639 74.6042 682.483 74.1626 682.483 73.643V36.6991C682.483 36.1795 682.639 35.7638 682.951 35.4521C683.315 35.0883 683.756 34.9065 684.276 34.9065H688.017C688.537 34.9065 688.952 35.0883 689.264 35.4521C689.576 35.7638 689.732 36.1795 689.732 36.6991V51.6637H711.009V36.6991C711.009 36.1795 711.165 35.7638 711.477 35.4521C711.841 35.0883 712.282 34.9065 712.802 34.9065H716.465C716.985 34.9065 717.401 35.0883 717.712 35.4521C718.076 35.7638 718.258 36.1795 718.258 36.6991V73.643C718.258 74.1626 718.076 74.6042 717.712 74.968C717.401 75.2797 716.985 75.4356 716.465 75.4356H712.802C712.282 75.4356 711.841 75.2797 711.477 74.968C711.165 74.6042 711.009 74.1626 711.009 73.643V57.899H689.732V73.643C689.732 74.1626 689.576 74.6042 689.264 74.968C688.952 75.2797 688.537 75.4356 688.017 75.4356H684.276ZM741.283 76.215C738.685 76.215 736.321 75.6954 734.19 74.6562C732.06 73.617 730.345 72.2141 729.046 70.4474C727.747 68.6808 727.098 66.6803 727.098 64.446C727.098 60.8607 728.553 58.0029 731.462 55.8725C734.372 53.7421 738.165 52.3392 742.842 51.6637L754.455 50.027V47.7667C754.455 45.2726 753.727 43.3241 752.273 41.9211C750.87 40.5182 748.557 39.8167 745.336 39.8167C742.998 39.8167 741.101 40.2844 739.646 41.2197C738.243 42.1549 737.256 43.35 736.684 44.8049C736.373 45.5843 735.827 45.974 735.048 45.974H731.54C730.969 45.974 730.527 45.8182 730.215 45.5064C729.956 45.1427 729.826 44.727 729.826 44.2593C729.826 43.4799 730.111 42.5187 730.683 41.3755C731.306 40.2324 732.242 39.1153 733.489 38.0241C734.736 36.9329 736.321 36.0236 738.243 35.2962C740.218 34.5168 742.608 34.1271 745.414 34.1271C748.531 34.1271 751.155 34.5427 753.286 35.3741C755.416 36.1535 757.079 37.2187 758.274 38.5697C759.521 39.9207 760.404 41.4535 760.924 43.1682C761.496 44.8829 761.781 46.6236 761.781 48.3902V73.643C761.781 74.1626 761.599 74.6042 761.236 74.968C760.924 75.2797 760.508 75.4356 759.989 75.4356H756.403C755.832 75.4356 755.39 75.2797 755.078 74.968C754.767 74.6042 754.611 74.1626 754.611 73.643V70.2915C753.935 71.2268 753.026 72.1621 751.883 73.0974C750.74 73.9807 749.311 74.7341 747.596 75.3577C745.881 75.9292 743.777 76.215 741.283 76.215ZM742.92 70.3695C745.05 70.3695 746.999 69.9278 748.765 69.0445C750.532 68.1092 751.909 66.6803 752.896 64.7577C753.935 62.8352 754.455 60.419 754.455 57.5093V55.3269L745.414 56.6519C741.725 57.1715 738.945 58.0548 737.074 59.3019C735.204 60.497 734.268 62.0298 734.268 63.9004C734.268 65.3553 734.684 66.5764 735.515 67.5636C736.399 68.4989 737.49 69.2004 738.789 69.668C740.14 70.1356 741.517 70.3695 742.92 70.3695Z" fill="#403E3E"/>
</svg>
</div>

      
  </div>
</template>





  
  <script>
  export default {
    data() {
      return {
        circles: [
        {id:1, cx:535, cy:837, r:11, fill:'#14B5FF', row: 1, seat:1},
{id:2, cx:573, cy:833, r:11, fill:'#14B5FF', row: 1, seat:2},
{id:3, cx:611, cy:829, r:11, fill:'#14B5FF', row: 1, seat:3},
{id:4, cx:649, cy:825, r:11, fill:'#14B5FF', row: 1, seat:4},
{id:5, cx:685, cy:821, r:11, fill:'#14B5FF', row: 1, seat:5},
{id:6, cx:723, cy:819, r:8, fill:'#D9D9D9', row: 1, seat:6},
{id:7, cx:761, cy:817, r:8, fill:'#D9D9D9', row: 1, seat:7},
{id:8, cx:799, cy:815, r:8, fill:'#D9D9D9', row: 1, seat:8},
{id:9, cx:837, cy:813, r:8, fill:'#D9D9D9', row: 1, seat:9},
{id:10, cx:875, cy:813, r:8, fill:'#D9D9D9', row: 1, seat:10},
{id:11, cx:997, cy:813, r:8, fill:'#D9D9D9', row: 1, seat:11},
{id:12, cx:1037, cy:813, r:8, fill:'#D9D9D9', row: 1, seat:12},
{id:13, cx:1075, cy:815, r:8, fill:'#D9D9D9', row: 1, seat:13},
{id:14, cx:1111, cy:817, r:8, fill:'#D9D9D9', row: 1, seat:14},
{id:15, cx:1149, cy:819, r:11, fill:'#14B5FF', row: 1, seat:15},
{id:16, cx:1187, cy:821, r:11, fill:'#14B5FF', row: 1, seat:16},
{id:17, cx:1225, cy:825, r:11, fill:'#14B5FF', row: 1, seat:17},
{id:18, cx:1261, cy:829, r:11, fill:'#14B5FF', row: 1, seat:18},
{id:19, cx:1299, cy:833, r:11, fill:'#14B5FF', row: 1, seat:19},
{id:20, cx:1337, cy:837, r:11, fill:'#14B5FF', row: 1, seat:20},
{id:21, cx:423, cy:809, r:8, fill:'#D9D9D9', row: 2, seat:1},
{id:22, cx:459, cy:803, r:8, fill:'#D9D9D9', row: 2, seat:2},
{id:23, cx:497, cy:797, r:11, fill:'#14B5FF', row: 2, seat:3},
{id:24, cx:535, cy:793, r:11, fill:'#14B5FF', row: 2, seat:4},
{id:25, cx:573, cy:789, r:11, fill:'#14B5FF', row: 2, seat:5},
{id:26, cx:609, cy:785, r:11, fill:'#14B5FF', row: 2, seat:6},
{id:27, cx:647, cy:781, r:11, fill:'#14B5FF', row: 2, seat:7},
{id:28, cx:685, cy:777, r:11, fill:'#14B5FF', row: 2, seat:8},
{id:29, cx:723, cy:775, r:11, fill:'#14B5FF', row: 2, seat:9},
{id:30, cx:759, cy:773, r:11, fill:'#14B5FF', row: 2, seat:10},
{id:31, cx:797, cy:771, r:8, fill:'#D9D9D9', row: 2, seat:11},
{id:32, cx:835, cy:769, r:8, fill:'#D9D9D9', row: 2, seat:12},
{id:33, cx:875, cy:769, r:8, fill:'#D9D9D9', row: 2, seat:13},
{id:34, cx:997, cy:769, r:8, fill:'#D9D9D9', row: 2, seat:14},
{id:35, cx:1035, cy:769, r:8, fill:'#D9D9D9', row: 2, seat:15},
{id:36, cx:1073, cy:771, r:11, fill:'#14B5FF', row: 2, seat:16},
{id:37, cx:1111, cy:773, r:11, fill:'#14B5FF', row: 2, seat:17},
{id:38, cx:1149, cy:775, r:11, fill:'#14B5FF', row: 2, seat:18},
{id:39, cx:1185, cy:777, r:11, fill:'#14B5FF', row: 2, seat:19},
{id:40, cx:1223, cy:781, r:11, fill:'#14B5FF', row: 2, seat:20},
{id:41, cx:1261, cy:783, r:11, fill:'#14B5FF', row: 2, seat:21},
{id:42, cx:1299, cy:787, r:11, fill:'#14B5FF', row: 2, seat:22},
{id:43, cx:1335, cy:791, r:11, fill:'#14B5FF', row: 2, seat:23},
{id:44, cx:1373, cy:797, r:11, fill:'#14B5FF', row: 2, seat:24},
{id:45, cx:1411, cy:801, r:8, fill:'#D9D9D9', row: 2, seat:25},
{id:46, cx:1449, cy:807, r:8, fill:'#D9D9D9', row: 2, seat:26},
{id:47, cx:313, cy:783, r:11, fill:'#D9207A', row: 3, seat:1},
{id:48, cx:349, cy:777, r:11, fill:'#D9207A', row: 3, seat:2},
{id:49, cx:387, cy:769, r:11, fill:'#D9207A', row: 3, seat:3},
{id:50, cx:423, cy:763, r:11, fill:'#D9207A', row: 3, seat:4},
{id:51, cx:461, cy:759, r:11, fill:'#8C12CA', row: 3, seat:5},
{id:52, cx:499, cy:753, r:11, fill:'#8C12CA', row: 3, seat:6},
{id:53, cx:535, cy:749, r:11, fill:'#8C12CA', row: 3, seat:7},
{id:54, cx:573, cy:745, r:11, fill:'#14B5FF', row: 3, seat:8},
{id:55, cx:611, cy:741, r:11, fill:'#14B5FF', row: 3, seat:9},
{id:56, cx:649, cy:737, r:11, fill:'#14B5FF', row: 3, seat:10},
{id:57, cx:685, cy:733, r:11, fill:'#14B5FF', row: 3, seat:11},
{id:58, cx:723, cy:731, r:11, fill:'#14B5FF', row: 3, seat:12},
{id:59, cx:761, cy:729, r:11, fill:'#14B5FF', row: 3, seat:13},
{id:60, cx:799, cy:727, r:11, fill:'#14B5FF', row: 3, seat:14},
{id:61, cx:837, cy:725, r:8, fill:'#D9D9D9', row: 3, seat:15},
{id:62, cx:875, cy:725, r:8, fill:'#D9D9D9', row: 3, seat:16},
{id:63, cx:997, cy:725, r:8, fill:'#D9D9D9', row: 3, seat:17},
{id:64, cx:1037, cy:725, r:8, fill:'#D9D9D9', row: 3, seat:18},
{id:65, cx:1075, cy:727, r:8, fill:'#D9D9D9', row: 3, seat:19},
{id:66, cx:1111, cy:729, r:11, fill:'#14B5FF', row: 3, seat:20},
{id:67, cx:1149, cy:731, r:11, fill:'#14B5FF', row: 3, seat:21},
{id:68, cx:1187, cy:733, r:11, fill:'#14B5FF', row: 3, seat:22},
{id:69, cx:1225, cy:737, r:11, fill:'#14B5FF', row: 3, seat:23},
{id:70, cx:1263, cy:739, r:11, fill:'#14B5FF', row: 3, seat:24},
{id:71, cx:1299, cy:743, r:11, fill:'#14B5FF', row: 3, seat:25},
{id:72, cx:1337, cy:747, r:11, fill:'#8C12CA', row: 3, seat:26},
{id:73, cx:1375, cy:753, r:11, fill:'#8C12CA', row: 3, seat:27},
{id:74, cx:1411, cy:757, r:11, fill:'#8C12CA', row: 3, seat:28},
{id:75, cx:1449, cy:763, r:11, fill:'#D9207A', row: 3, seat:29},
{id:76, cx:1487, cy:769, r:11, fill:'#D9207A', row: 3, seat:30},
{id:77, cx:1523, cy:775, r:11, fill:'#D9207A', row: 3, seat:31},
{id:78, cx:1561, cy:783, r:11, fill:'#D9207A', row: 3, seat:32},
{id:79, cx:275, cy:745, r:11, fill:'#D9207A', row: 4, seat:1},
{id:80, cx:311, cy:739, r:11, fill:'#D9207A', row: 4, seat:2},
{id:81, cx:349, cy:731, r:11, fill:'#D9207A', row: 4, seat:3},
{id:82, cx:385, cy:725, r:11, fill:'#D9207A', row: 4, seat:4},
{id:83, cx:423, cy:719, r:11, fill:'#8C12CA', row: 4, seat:5},
{id:84, cx:459, cy:715, r:11, fill:'#8C12CA', row: 4, seat:6},
{id:85, cx:497, cy:709, r:11, fill:'#8C12CA', row: 4, seat:7},
{id:86, cx:535, cy:705, r:11, fill:'#8C12CA', row: 4, seat:8},
{id:87, cx:573, cy:701, r:11, fill:'#14B5FF', row: 4, seat:9},
{id:88, cx:609, cy:697, r:11, fill:'#14B5FF', row: 4, seat:10},
{id:89, cx:647, cy:693, r:11, fill:'#14B5FF', row: 4, seat:11},
{id:90, cx:685, cy:689, r:11, fill:'#14B5FF', row: 4, seat:12},
{id:91, cx:723, cy:687, r:11, fill:'#14B5FF', row: 4, seat:13},
{id:92, cx:759, cy:685, r:11, fill:'#14B5FF', row: 4, seat:14},
{id:93, cx:797, cy:683, r:11, fill:'#14B5FF', row: 4, seat:15},
{id:94, cx:835, cy:681, r:8, fill:'#D9D9D9', row: 4, seat:16},
{id:95, cx:875, cy:681, r:8, fill:'#D9D9D9', row: 4, seat:17},
{id:96, cx:997, cy:681, r:8, fill:'#D9D9D9', row: 4, seat:18},
{id:97, cx:1035, cy:681, r:8, fill:'#D9D9D9', row: 4, seat:19},
{id:98, cx:1073, cy:683, r:11, fill:'#14B5FF', row: 4, seat:20},
{id:99, cx:1111, cy:685, r:11, fill:'#14B5FF', row: 4, seat:21},
{id:100, cx:1149, cy:687, r:11, fill:'#14B5FF', row: 4, seat:22},
{id:101, cx:1185, cy:689, r:11, fill:'#14B5FF', row: 4, seat:23},
{id:102, cx:1223, cy:691, r:11, fill:'#14B5FF', row: 4, seat:24},
{id:103, cx:1261, cy:695, r:11, fill:'#14B5FF', row: 4, seat:25},
{id:104, cx:1299, cy:699, r:11, fill:'#14B5FF', row: 4, seat:26},
{id:105, cx:1337, cy:703, r:11, fill:'#8C12CA', row: 4, seat:27},
{id:106, cx:1373, cy:709, r:11, fill:'#8C12CA', row: 4, seat:28},
{id:107, cx:1411, cy:713, r:11, fill:'#8C12CA', row: 4, seat:29},
{id:108, cx:1449, cy:719, r:11, fill:'#8C12CA', row: 4, seat:30},
{id:109, cx:1485, cy:725, r:11, fill:'#D9207A', row: 4, seat:31},
{id:110, cx:1523, cy:731, r:11, fill:'#D9207A', row: 4, seat:32},
{id:111, cx:1559, cy:737, r:11, fill:'#D9207A', row: 4, seat:33},
{id:112, cx:1597, cy:745, r:11, fill:'#D9207A', row: 4, seat:34},
{id:113, cx:237, cy:709, r:11, fill:'#FF9500', row: 5, seat:1},
{id:114, cx:275, cy:701, r:11, fill:'#FF9500', row: 5, seat:2},
{id:115, cx:311, cy:693, r:11, fill:'#FF9500', row: 5, seat:3},
{id:116, cx:349, cy:687, r:11, fill:'#FF9500', row: 5, seat:4},
{id:117, cx:385, cy:681, r:11, fill:'#D9207A', row: 5, seat:5},
{id:118, cx:423, cy:675, r:11, fill:'#D9207A', row: 5, seat:6},
{id:119, cx:459, cy:669, r:11, fill:'#D9207A', row: 5, seat:7},
{id:120, cx:497, cy:665, r:11, fill:'#D9207A', row: 5, seat:8},
{id:121, cx:535, cy:659, r:11, fill:'#D9207A', row: 5, seat:9},
{id:122, cx:573, cy:655, r:11, fill:'#D9207A', row: 5, seat:10},
{id:123, cx:609, cy:651, r:11, fill:'#14B5FF', row: 5, seat:11},
{id:124, cx:647, cy:649, r:11, fill:'#14B5FF', row: 5, seat:12},
{id:125, cx:685, cy:645, r:11, fill:'#14B5FF', row: 5, seat:13},
{id:126, cx:723, cy:643, r:11, fill:'#14B5FF', row: 5, seat:14},
{id:127, cx:761, cy:641, r:11, fill:'#14B5FF', row: 5, seat:15},
{id:128, cx:797, cy:639, r:8, fill:'#D9D9D9', row: 5, seat:16},
{id:129, cx:835, cy:637, r:8, fill:'#D9D9D9', row: 5, seat:17},
{id:130, cx:875, cy:637, r:8, fill:'#D9D9D9', row: 5, seat:18},
{id:131, cx:997, cy:637, r:8, fill:'#D9D9D9', row: 5, seat:19},
{id:132, cx:1035, cy:637, r:11, fill:'#14B5FF', row: 5, seat:20},
{id:133, cx:1073, cy:639, r:11, fill:'#14B5FF', row: 5, seat:21},
{id:134, cx:1111, cy:641, r:11, fill:'#14B5FF', row: 5, seat:22},
{id:135, cx:1149, cy:643, r:11, fill:'#14B5FF', row: 5, seat:23},
{id:136, cx:1187, cy:645, r:11, fill:'#14B5FF', row: 5, seat:24},
{id:137, cx:1223, cy:647, r:11, fill:'#14B5FF', row: 5, seat:25},
{id:138, cx:1261, cy:651, r:11, fill:'#14B5FF', row: 5, seat:26},
{id:139, cx:1299, cy:655, r:8, fill:'#D9D9D9', row: 5, seat:27},
{id:140, cx:1337, cy:659, r:8, fill:'#D9D9D9', row: 5, seat:28},
{id:141, cx:1373, cy:663, r:11, fill:'#D9207A', row: 5, seat:29},
{id:142, cx:1411, cy:669, r:11, fill:'#D9207A', row: 5, seat:30},
{id:143, cx:1449, cy:675, r:11, fill:'#D9207A', row: 5, seat:31},
{id:144, cx:1485, cy:679, r:11, fill:'#D9207A', row: 5, seat:32},
{id:145, cx:1523, cy:687, r:11, fill:'#FF9500', row: 5, seat:33},
{id:146, cx:1559, cy:693, r:11, fill:'#FF9500', row: 5, seat:34},
{id:147, cx:1597, cy:699, r:11, fill:'#FF9500', row: 5, seat:35},
{id:148, cx:1633, cy:707, r:11, fill:'#FF9500', row: 5, seat:36},
{id:149, cx:199, cy:671, r:11, fill:'#FF9500', row: 6, seat:1},
{id:150, cx:237, cy:663, r:11, fill:'#FF9500', row: 6, seat:2},
{id:151, cx:273, cy:657, r:11, fill:'#FF9500', row: 6, seat:3},
{id:152, cx:311, cy:649, r:11, fill:'#FF9500', row: 6, seat:4},
{id:153, cx:347, cy:643, r:11, fill:'#D9207A', row: 6, seat:5},
{id:154, cx:385, cy:637, r:11, fill:'#D9207A', row: 6, seat:6},
{id:155, cx:423, cy:631, r:11, fill:'#D9207A', row: 6, seat:7},
{id:156, cx:459, cy:625, r:11, fill:'#D9207A', row: 6, seat:8},
{id:157, cx:497, cy:621, r:11, fill:'#D9207A', row: 6, seat:9},
{id:158, cx:535, cy:615, r:11, fill:'#D9207A', row: 6, seat:10},
{id:159, cx:571, cy:611, r:11, fill:'#D9207A', row: 6, seat:11},
{id:160, cx:609, cy:607, r:11, fill:'#14B5FF', row: 6, seat:12},
{id:161, cx:647, cy:605, r:11, fill:'#14B5FF', row: 6, seat:13},
{id:162, cx:685, cy:601, r:11, fill:'#14B5FF', row: 6, seat:14},
{id:163, cx:723, cy:599, r:11, fill:'#14B5FF', row: 6, seat:15},
{id:164, cx:759, cy:597, r:11, fill:'#14B5FF', row: 6, seat:16},
{id:165, cx:797, cy:595, r:11, fill:'#14B5FF', row: 6, seat:17},
{id:166, cx:835, cy:593, r:11, fill:'#14B5FF', row: 6, seat:18},
{id:167, cx:875, cy:593, r:11, fill:'#14B5FF', row: 6, seat:19},
{id:168, cx:997, cy:593, r:11, fill:'#14B5FF', row: 6, seat:20},
{id:169, cx:1035, cy:593, r:11, fill:'#14B5FF', row: 6, seat:21},
{id:170, cx:1073, cy:595, r:11, fill:'#14B5FF', row: 6, seat:22},
{id:171, cx:1111, cy:597, r:11, fill:'#14B5FF', row: 6, seat:23},
{id:172, cx:1149, cy:599, r:8, fill:'#D9D9D9', row: 6, seat:24},
{id:173, cx:1185, cy:601, r:8, fill:'#D9D9D9', row: 6, seat:25},
{id:174, cx:1223, cy:603, r:11, fill:'#14B5FF', row: 6, seat:26},
{id:175, cx:1261, cy:607, r:11, fill:'#14B5FF', row: 6, seat:27},
{id:176, cx:1299, cy:611, r:11, fill:'#D9207A', row: 6, seat:28},
{id:177, cx:1335, cy:615, r:11, fill:'#D9207A', row: 6, seat:29},
{id:178, cx:1373, cy:619, r:11, fill:'#D9207A', row: 6, seat:30},
{id:179, cx:1411, cy:625, r:11, fill:'#D9207A', row: 6, seat:31},
{id:180, cx:1449, cy:629, r:11, fill:'#D9207A', row: 6, seat:32},
{id:181, cx:1485, cy:635, r:11, fill:'#D9207A', row: 6, seat:33},
{id:182, cx:1523, cy:641, r:11, fill:'#D9207A', row: 6, seat:34},
{id:183, cx:1559, cy:649, r:11, fill:'#FF9500', row: 6, seat:35},
{id:184, cx:1597, cy:655, r:11, fill:'#FF9500', row: 6, seat:36},
{id:185, cx:1633, cy:663, r:11, fill:'#FF9500', row: 6, seat:37},
{id:186, cx:1671, cy:671, r:11, fill:'#FF9500', row: 6, seat:38},
{id:187, cx:163, cy:635, r:11, fill:'#84C28E', row: 7, seat:1},
{id:188, cx:199, cy:627, r:11, fill:'#84C28E', row: 7, seat:2},
{id:189, cx:237, cy:619, r:11, fill:'#84C28E', row: 7, seat:3},
{id:190, cx:273, cy:611, r:11, fill:'#84C28E', row: 7, seat:4},
{id:191, cx:311, cy:605, r:11, fill:'#FF9500', row: 7, seat:5},
{id:192, cx:349, cy:599, r:11, fill:'#FF9500', row: 7, seat:6},
{id:193, cx:385, cy:593, r:11, fill:'#FF9500', row: 7, seat:7},
{id:194, cx:423, cy:587, r:11, fill:'#FF9500', row: 7, seat:8},
{id:195, cx:459, cy:581, r:11, fill:'#FF9500', row: 7, seat:9},
{id:196, cx:497, cy:577, r:11, fill:'#FF9500', row: 7, seat:10},
{id:197, cx:535, cy:571, r:11, fill:'#FF9500', row: 7, seat:11},
{id:198, cx:573, cy:567, r:11, fill:'#FF9500', row: 7, seat:12},
{id:199, cx:609, cy:563, r:11, fill:'#8C12CA', row: 7, seat:13},
{id:200, cx:647, cy:561, r:11, fill:'#8C12CA', row: 7, seat:14},
{id:201, cx:685, cy:557, r:11, fill:'#8C12CA', row: 7, seat:15},
{id:202, cx:723, cy:555, r:11, fill:'#8C12CA', row: 7, seat:16},
{id:203, cx:759, cy:553, r:8, fill:'#D9D9D9', row: 7, seat:17},
{id:204, cx:797, cy:551, r:8, fill:'#D9D9D9', row: 7, seat:18},
{id:205, cx:835, cy:549, r:8, fill:'#D9D9D9', row: 7, seat:19},
{id:206, cx:875, cy:549, r:8, fill:'#D9D9D9', row: 7, seat:20},
{id:207, cx:997, cy:549, r:8, fill:'#D9D9D9', row: 7, seat:21},
{id:208, cx:1035, cy:549, r:8, fill:'#D9D9D9', row: 7, seat:22},
{id:209, cx:1073, cy:551, r:8, fill:'#D9D9D9', row: 7, seat:23},
{id:210, cx:1111, cy:553, r:11, fill:'#8C12CA', row: 7, seat:24},
{id:211, cx:1149, cy:555, r:11, fill:'#8C12CA', row: 7, seat:25},
{id:212, cx:1187, cy:557, r:11, fill:'#8C12CA', row: 7, seat:26},
{id:213, cx:1223, cy:559, r:11, fill:'#8C12CA', row: 7, seat:27},
{id:214, cx:1261, cy:563, r:11, fill:'#8C12CA', row: 7, seat:28},
{id:215, cx:1299, cy:567, r:11, fill:'#FF9500', row: 7, seat:29},
{id:216, cx:1337, cy:571, r:11, fill:'#FF9500', row: 7, seat:30},
{id:217, cx:1373, cy:575, r:11, fill:'#FF9500', row: 7, seat:31},
{id:218, cx:1411, cy:579, r:11, fill:'#FF9500', row: 7, seat:32},
{id:219, cx:1449, cy:585, r:11, fill:'#FF9500', row: 7, seat:33},
{id:220, cx:1485, cy:591, r:11, fill:'#FF9500', row: 7, seat:34},
{id:221, cx:1523, cy:597, r:11, fill:'#FF9500', row: 7, seat:35},
{id:222, cx:1559, cy:603, r:11, fill:'#FF9500', row: 7, seat:36},
{id:223, cx:1597, cy:611, r:11, fill:'#84C28E', row: 7, seat:37},
{id:224, cx:1635, cy:617, r:11, fill:'#84C28E', row: 7, seat:38},
{id:225, cx:1671, cy:625, r:11, fill:'#84C28E', row: 7, seat:39},
{id:226, cx:1707, cy:633, r:11, fill:'#84C28E', row: 7, seat:40},
{id:227, cx:125, cy:599, r:11, fill:'#84C28E', row: 8, seat:1},
{id:228, cx:163, cy:589, r:11, fill:'#84C28E', row: 8, seat:2},
{id:229, cx:199, cy:581, r:11, fill:'#84C28E', row: 8, seat:3},
{id:230, cx:237, cy:575, r:11, fill:'#84C28E', row: 8, seat:4},
{id:231, cx:273, cy:567, r:11, fill:'#FF9500', row: 8, seat:5},
{id:232, cx:311, cy:561, r:11, fill:'#FF9500', row: 8, seat:6},
{id:233, cx:347, cy:553, r:11, fill:'#FF9500', row: 8, seat:7},
{id:234, cx:385, cy:547, r:11, fill:'#FF9500', row: 8, seat:8},
{id:235, cx:423, cy:541, r:11, fill:'#FF9500', row: 8, seat:9},
{id:236, cx:459, cy:537, r:11, fill:'#FF9500', row: 8, seat:10},
{id:237, cx:497, cy:531, r:11, fill:'#FF9500', row: 8, seat:11},
{id:238, cx:535, cy:527, r:11, fill:'#FF9500', row: 8, seat:12},
{id:239, cx:571, cy:523, r:11, fill:'#FF9500', row: 8, seat:13},
{id:240, cx:609, cy:519, r:11, fill:'#FF9500', row: 8, seat:14},
{id:241, cx:647, cy:517, r:11, fill:'#FF9500', row: 8, seat:15},
{id:242, cx:685, cy:513, r:11, fill:'#8C12CA', row: 8, seat:16},
{id:243, cx:723, cy:511, r:11, fill:'#8C12CA', row: 8, seat:17},
{id:244, cx:759, cy:509, r:11, fill:'#8C12CA', row: 8, seat:18},
{id:245, cx:797, cy:507, r:11, fill:'#8C12CA', row: 8, seat:19},
{id:246, cx:835, cy:505, r:11, fill:'#8C12CA', row: 8, seat:20},
{id:247, cx:875, cy:505, r:11, fill:'#8C12CA', row: 8, seat:21},
{id:248, cx:997, cy:505, r:8, fill:'#D9D9D9', row: 8, seat:22},
{id:249, cx:1035, cy:505, r:8, fill:'#D9D9D9', row: 8, seat:23},
{id:250, cx:1073, cy:507, r:11, fill:'#8C12CA', row: 8, seat:24},
{id:251, cx:1111, cy:509, r:11, fill:'#8C12CA', row: 8, seat:25},
{id:252, cx:1149, cy:511, r:11, fill:'#8C12CA', row: 8, seat:26},
{id:253, cx:1185, cy:513, r:11, fill:'#8C12CA', row: 8, seat:27},
{id:254, cx:1223, cy:515, r:11, fill:'#FF9500', row: 8, seat:28},
{id:255, cx:1261, cy:519, r:11, fill:'#FF9500', row: 8, seat:29},
{id:256, cx:1299, cy:523, r:11, fill:'#FF9500', row: 8, seat:30},
{id:257, cx:1335, cy:527, r:11, fill:'#FF9500', row: 8, seat:31},
{id:258, cx:1373, cy:531, r:11, fill:'#FF9500', row: 8, seat:32},
{id:259, cx:1411, cy:535, r:11, fill:'#FF9500', row: 8, seat:33},
{id:260, cx:1449, cy:541, r:11, fill:'#FF9500', row: 8, seat:34},
{id:261, cx:1485, cy:547, r:11, fill:'#FF9500', row: 8, seat:35},
{id:262, cx:1523, cy:553, r:11, fill:'#FF9500', row: 8, seat:36},
{id:263, cx:1559, cy:559, r:11, fill:'#FF9500', row: 8, seat:37},
{id:264, cx:1597, cy:565, r:11, fill:'#FF9500', row: 8, seat:38},
{id:265, cx:1633, cy:573, r:11, fill:'#84C28E', row: 8, seat:39},
{id:266, cx:1671, cy:581, r:11, fill:'#84C28E', row: 8, seat:40},
{id:267, cx:1707, cy:589, r:11, fill:'#84C28E', row: 8, seat:41},
{id:268, cx:1745, cy:597, r:11, fill:'#84C28E', row: 8, seat:42},
{id:269, cx:127, cy:553, r:11, fill:'#6DD7DF', row: 9, seat:1},
{id:270, cx:163, cy:545, r:11, fill:'#6DD7DF', row: 9, seat:2},
{id:271, cx:199, cy:537, r:11, fill:'#6DD7DF', row: 9, seat:3},
{id:272, cx:237, cy:529, r:11, fill:'#6DD7DF', row: 9, seat:4},
{id:273, cx:273, cy:523, r:11, fill:'#84C28E', row: 9, seat:5},
{id:274, cx:311, cy:515, r:11, fill:'#84C28E', row: 9, seat:6},
{id:275, cx:349, cy:509, r:11, fill:'#84C28E', row: 9, seat:7},
{id:276, cx:385, cy:503, r:11, fill:'#84C28E', row: 9, seat:8},
{id:277, cx:423, cy:497, r:11, fill:'#84C28E', row: 9, seat:9},
{id:278, cx:459, cy:493, r:11, fill:'#84C28E', row: 9, seat:10},
{id:279, cx:497, cy:487, r:11, fill:'#84C28E', row: 9, seat:11},
{id:280, cx:535, cy:483, r:11, fill:'#FF9500', row: 9, seat:12},
{id:281, cx:573, cy:479, r:11, fill:'#FF9500', row: 9, seat:13},
{id:282, cx:609, cy:475, r:11, fill:'#FF9500', row: 9, seat:14},
{id:283, cx:647, cy:471, r:11, fill:'#FF9500', row: 9, seat:15},
{id:284, cx:685, cy:469, r:11, fill:'#FF9500', row: 9, seat:16},
{id:285, cx:723, cy:467, r:11, fill:'#FF9500', row: 9, seat:17},
{id:286, cx:761, cy:465, r:11, fill:'#8C12CA', row: 9, seat:18},
{id:287, cx:797, cy:463, r:11, fill:'#8C12CA', row: 9, seat:19},
{id:288, cx:835, cy:461, r:11, fill:'#8C12CA', row: 9, seat:20},
{id:289, cx:875, cy:461, r:11, fill:'#8C12CA', row: 9, seat:21},
{id:290, cx:997, cy:461, r:11, fill:'#8C12CA', row: 9, seat:22},
{id:291, cx:1035, cy:461, r:11, fill:'#8C12CA', row: 9, seat:23},
{id:292, cx:1073, cy:463, r:11, fill:'#8C12CA', row: 9, seat:24},
{id:293, cx:1111, cy:465, r:11, fill:'#8C12CA', row: 9, seat:25},
{id:294, cx:1149, cy:467, r:11, fill:'#FF9500', row: 9, seat:26},
{id:295, cx:1187, cy:469, r:11, fill:'#FF9500', row: 9, seat:27},
{id:296, cx:1223, cy:471, r:11, fill:'#FF9500', row: 9, seat:28},
{id:297, cx:1261, cy:475, r:11, fill:'#FF9500', row: 9, seat:29},
{id:298, cx:1299, cy:479, r:11, fill:'#FF9500', row: 9, seat:30},
{id:299, cx:1337, cy:483, r:11, fill:'#FF9500', row: 9, seat:31},
{id:300, cx:1373, cy:487, r:11, fill:'#84C28E', row: 9, seat:32},
{id:301, cx:1411, cy:491, r:11, fill:'#84C28E', row: 9, seat:33},
{id:302, cx:1449, cy:497, r:11, fill:'#84C28E', row: 9, seat:34},
{id:303, cx:1487, cy:501, r:11, fill:'#84C28E', row: 9, seat:35},
{id:304, cx:1523, cy:507, r:11, fill:'#84C28E', row: 9, seat:36},
{id:305, cx:1561, cy:515, r:11, fill:'#84C28E', row: 9, seat:37},
{id:306, cx:1597, cy:521, r:11, fill:'#84C28E', row: 9, seat:38},
{id:307, cx:1635, cy:529, r:11, fill:'#6DD7DF', row: 9, seat:39},
{id:308, cx:1671, cy:535, r:11, fill:'#6DD7DF', row: 9, seat:40},
{id:309, cx:1709, cy:543, r:11, fill:'#6DD7DF', row: 9, seat:41},
{id:310, cx:1745, cy:551, r:11, fill:'#6DD7DF', row: 9, seat:42},
{id:311, cx:163, cy:499, r:11, fill:'#6DD7DF', row: 10, seat:1},
{id:312, cx:199, cy:493, r:11, fill:'#6DD7DF', row: 10, seat:2},
{id:313, cx:237, cy:485, r:11, fill:'#6DD7DF', row: 10, seat:3},
{id:314, cx:273, cy:477, r:11, fill:'#6DD7DF', row: 10, seat:4},
{id:315, cx:311, cy:471, r:11, fill:'#84C28E', row: 10, seat:5},
{id:316, cx:347, cy:465, r:11, fill:'#84C28E', row: 10, seat:6},
{id:317, cx:385, cy:459, r:11, fill:'#84C28E', row: 10, seat:7},
{id:318, cx:423, cy:453, r:11, fill:'#84C28E', row: 10, seat:8},
{id:319, cx:459, cy:447, r:11, fill:'#84C28E', row: 10, seat:9},
{id:320, cx:497, cy:443, r:11, fill:'#84C28E', row: 10, seat:10},
{id:321, cx:535, cy:439, r:11, fill:'#84C28E', row: 10, seat:11},
{id:322, cx:573, cy:435, r:11, fill:'#84C28E', row: 10, seat:12},
{id:323, cx:609, cy:431, r:11, fill:'#FF9500', row: 10, seat:13},
{id:324, cx:647, cy:427, r:11, fill:'#FF9500', row: 10, seat:14},
{id:325, cx:685, cy:425, r:11, fill:'#FF9500', row: 10, seat:15},
{id:326, cx:723, cy:423, r:11, fill:'#FF9500', row: 10, seat:16},
{id:327, cx:761, cy:421, r:11, fill:'#8C12CA', row: 10, seat:17},
{id:328, cx:797, cy:419, r:11, fill:'#8C12CA', row: 10, seat:18},
{id:329, cx:835, cy:417, r:11, fill:'#8C12CA', row: 10, seat:19},
{id:330, cx:875, cy:417, r:11, fill:'#8C12CA', row: 10, seat:20},
{id:331, cx:997, cy:417, r:11, fill:'#8C12CA', row: 10, seat:21},
{id:332, cx:1035, cy:417, r:11, fill:'#8C12CA', row: 10, seat:22},
{id:333, cx:1073, cy:419, r:11, fill:'#8C12CA', row: 10, seat:23},
{id:334, cx:1111, cy:419, r:11, fill:'#8C12CA', row: 10, seat:24},
{id:335, cx:1149, cy:423, r:11, fill:'#FF9500', row: 10, seat:25},
{id:336, cx:1187, cy:425, r:11, fill:'#FF9500', row: 10, seat:26},
{id:337, cx:1223, cy:427, r:11, fill:'#FF9500', row: 10, seat:27},
{id:338, cx:1261, cy:431, r:11, fill:'#FF9500', row: 10, seat:28},
{id:339, cx:1299, cy:433, r:11, fill:'#84C28E', row: 10, seat:29},
{id:340, cx:1337, cy:437, r:11, fill:'#84C28E', row: 10, seat:30},
{id:341, cx:1373, cy:443, r:11, fill:'#84C28E', row: 10, seat:31},
{id:342, cx:1411, cy:447, r:11, fill:'#84C28E', row: 10, seat:32},
{id:343, cx:1449, cy:453, r:11, fill:'#84C28E', row: 10, seat:33},
{id:344, cx:1485, cy:457, r:11, fill:'#84C28E', row: 10, seat:34},
{id:345, cx:1523, cy:463, r:11, fill:'#84C28E', row: 10, seat:35},
{id:346, cx:1561, cy:469, r:11, fill:'#84C28E', row: 10, seat:36},
{id:347, cx:1597, cy:477, r:11, fill:'#6DD7DF', row: 10, seat:37},
{id:348, cx:1635, cy:483, r:11, fill:'#6DD7DF', row: 10, seat:38},
{id:349, cx:1671, cy:491, r:11, fill:'#6DD7DF', row: 10, seat:39},
{id:350, cx:1709, cy:499, r:11, fill:'#6DD7DF', row: 10, seat:40},
{id:351, cx:199, cy:447, r:8, fill:'#D9D9D9', row: 11, seat:1},
{id:352, cx:237, cy:439, r:11, fill:'#A753A8', row: 11, seat:2},
{id:353, cx:273, cy:433, r:11, fill:'#A753A8', row: 11, seat:3},
{id:354, cx:311, cy:427, r:11, fill:'#A753A8', row: 11, seat:4},
{id:355, cx:349, cy:419, r:11, fill:'#A753A8', row: 11, seat:5},
{id:356, cx:385, cy:415, r:11, fill:'#A753A8', row: 11, seat:6},
{id:357, cx:423, cy:409, r:11, fill:'#A753A8', row: 11, seat:7},
{id:358, cx:459, cy:403, r:11, fill:'#84C28E', row: 11, seat:8},
{id:359, cx:497, cy:399, r:11, fill:'#84C28E', row: 11, seat:9},
{id:360, cx:535, cy:395, r:11, fill:'#84C28E', row: 11, seat:10},
{id:361, cx:573, cy:391, r:11, fill:'#84C28E', row: 11, seat:11},
{id:362, cx:609, cy:387, r:11, fill:'#84C28E', row: 11, seat:12},
{id:363, cx:647, cy:383, r:11, fill:'#84C28E', row: 11, seat:13},
{id:364, cx:685, cy:381, r:11, fill:'#FF9500', row: 11, seat:14},
{id:365, cx:723, cy:379, r:11, fill:'#FF9500', row: 11, seat:15},
{id:366, cx:761, cy:377, r:11, fill:'#FF9500', row: 11, seat:16},
{id:367, cx:797, cy:375, r:11, fill:'#FF9500', row: 11, seat:17},
{id:368, cx:835, cy:373, r:8, fill:'#D9D9D9', row: 11, seat:18},
{id:369, cx:875, cy:373, r:8, fill:'#D9D9D9', row: 11, seat:19},
{id:370, cx:997, cy:373, r:11, fill:'#FF9500', row: 11, seat:20},
{id:371, cx:1035, cy:373, r:11, fill:'#FF9500', row: 11, seat:21},
{id:372, cx:1073, cy:375, r:11, fill:'#FF9500', row: 11, seat:22},
{id:373, cx:1111, cy:375, r:11, fill:'#FF9500', row: 11, seat:23},
{id:374, cx:1149, cy:377, r:11, fill:'#FF9500', row: 11, seat:24},
{id:375, cx:1187, cy:381, r:11, fill:'#FF9500', row: 11, seat:25},
{id:376, cx:1223, cy:383, r:11, fill:'#84C28E', row: 11, seat:26},
{id:377, cx:1261, cy:387, r:11, fill:'#84C28E', row: 11, seat:27},
{id:378, cx:1299, cy:389, r:11, fill:'#84C28E', row: 11, seat:28},
{id:379, cx:1337, cy:393, r:11, fill:'#84C28E', row: 11, seat:29},
{id:380, cx:1375, cy:397, r:11, fill:'#84C28E', row: 11, seat:30},
{id:381, cx:1411, cy:403, r:11, fill:'#84C28E', row: 11, seat:31},
{id:382, cx:1449, cy:407, r:11, fill:'#A753A8', row: 11, seat:32},
{id:383, cx:1487, cy:413, r:11, fill:'#A753A8', row: 11, seat:33},
{id:384, cx:1523, cy:419, r:11, fill:'#A753A8', row: 11, seat:34},
{id:385, cx:1561, cy:425, r:11, fill:'#A753A8', row: 11, seat:35},
{id:386, cx:1597, cy:431, r:11, fill:'#A753A8', row: 11, seat:36},
{id:387, cx:1635, cy:439, r:11, fill:'#A753A8', row: 11, seat:37},
{id:388, cx:1671, cy:445, r:11, fill:'#A753A8', row: 11, seat:38},
{id:389, cx:237, cy:395, r:11, fill:'#A753A8', row: 12, seat:1},
{id:390, cx:273, cy:389, r:11, fill:'#A753A8', row: 12, seat:2},
{id:391, cx:311, cy:381, r:11, fill:'#A753A8', row: 12, seat:3},
{id:392, cx:347, cy:375, r:11, fill:'#A753A8', row: 12, seat:4},
{id:393, cx:385, cy:369, r:11, fill:'#A753A8', row: 12, seat:5},
{id:394, cx:423, cy:365, r:11, fill:'#A753A8', row: 12, seat:6},
{id:395, cx:459, cy:359, r:11, fill:'#A753A8', row: 12, seat:7},
{id:396, cx:497, cy:355, r:11, fill:'#A753A8', row: 12, seat:8},
{id:397, cx:535, cy:351, r:11, fill:'#A753A8', row: 12, seat:9},
{id:398, cx:573, cy:347, r:11, fill:'#A753A8', row: 12, seat:10},
{id:399, cx:609, cy:343, r:8, fill:'#D9D9D9', row: 12, seat:11},
{id:400, cx:647, cy:339, r:8, fill:'#D9D9D9', row: 12, seat:12},
{id:401, cx:685, cy:337, r:11, fill:'#84C28E', row: 12, seat:13},
{id:402, cx:723, cy:335, r:11, fill:'#84C28E', row: 12, seat:14},
{id:403, cx:761, cy:333, r:11, fill:'#84C28E', row: 12, seat:15},
{id:404, cx:797, cy:331, r:11, fill:'#84C28E', row: 12, seat:16},
{id:405, cx:835, cy:329, r:8, fill:'#D9D9D9', row: 12, seat:17},
{id:406, cx:875, cy:329, r:8, fill:'#D9D9D9', row: 12, seat:18},
{id:407, cx:997, cy:329, r:8, fill:'#D9D9D9', row: 12, seat:19},
{id:408, cx:1035, cy:329, r:11, fill:'#84C28E', row: 12, seat:20},
{id:409, cx:1073, cy:331, r:11, fill:'#84C28E', row: 12, seat:21},
{id:410, cx:1111, cy:331, r:11, fill:'#84C28E', row: 12, seat:22},
{id:411, cx:1149, cy:333, r:11, fill:'#84C28E', row: 12, seat:23},
{id:412, cx:1187, cy:337, r:11, fill:'#84C28E', row: 12, seat:24},
{id:413, cx:1223, cy:339, r:8, fill:'#D9D9D9', row: 12, seat:25},
{id:414, cx:1261, cy:343, r:8, fill:'#D9D9D9', row: 12, seat:26},
{id:415, cx:1299, cy:345, r:8, fill:'#D9D9D9', row: 12, seat:27},
{id:416, cx:1337, cy:349, r:8, fill:'#D9D9D9', row: 12, seat:28},
{id:417, cx:1375, cy:353, r:11, fill:'#A753A8', row: 12, seat:29},
{id:418, cx:1411, cy:359, r:11, fill:'#A753A8', row: 12, seat:30},
{id:419, cx:1449, cy:363, r:11, fill:'#A753A8', row: 12, seat:31},
{id:420, cx:1487, cy:369, r:11, fill:'#A753A8', row: 12, seat:32},
{id:421, cx:1523, cy:375, r:11, fill:'#A753A8', row: 12, seat:33},
{id:422, cx:1561, cy:381, r:11, fill:'#A753A8', row: 12, seat:34},
{id:423, cx:1597, cy:387, r:11, fill:'#A753A8', row: 12, seat:35},
{id:424, cx:1635, cy:393, r:11, fill:'#A753A8', row: 12, seat:36},
{id:425, cx:311, cy:337, r:11, fill:'#A753A8', row: 13, seat:1},
{id:426, cx:347, cy:331, r:11, fill:'#A753A8', row: 13, seat:2},
{id:427, cx:385, cy:325, r:11, fill:'#A753A8', row: 13, seat:3},
{id:428, cx:421, cy:319, r:11, fill:'#A753A8', row: 13, seat:4},
{id:429, cx:459, cy:315, r:11, fill:'#A753A8', row: 13, seat:5},
{id:430, cx:497, cy:311, r:11, fill:'#A753A8', row: 13, seat:6},
{id:431, cx:535, cy:305, r:11, fill:'#A753A8', row: 13, seat:7},
{id:432, cx:571, cy:303, r:11, fill:'#A753A8', row: 13, seat:8},
{id:433, cx:609, cy:299, r:11, fill:'#A753A8', row: 13, seat:9},
{id:434, cx:647, cy:295, r:11, fill:'#A753A8', row: 13, seat:10},
{id:435, cx:685, cy:293, r:11, fill:'#A753A8', row: 13, seat:11},
{id:436, cx:721, cy:291, r:11, fill:'#A753A8', row: 13, seat:12},
{id:437, cx:759, cy:289, r:11, fill:'#84C28E', row: 13, seat:13},
{id:438, cx:797, cy:287, r:11, fill:'#84C28E', row: 13, seat:14},
{id:439, cx:835, cy:285, r:11, fill:'#84C28E', row: 13, seat:15},
{id:440, cx:875, cy:285, r:11, fill:'#84C28E', row: 13, seat:16},
{id:441, cx:997, cy:285, r:11, fill:'#84C28E', row: 13, seat:17},
{id:442, cx:1035, cy:285, r:11, fill:'#84C28E', row: 13, seat:18},
{id:443, cx:1073, cy:287, r:11, fill:'#84C28E', row: 13, seat:19},
{id:444, cx:1111, cy:287, r:11, fill:'#84C28E', row: 13, seat:20},
{id:445, cx:1149, cy:289, r:11, fill:'#A753A8', row: 13, seat:21},
{id:446, cx:1185, cy:293, r:11, fill:'#A753A8', row: 13, seat:22},
{id:447, cx:1223, cy:295, r:11, fill:'#A753A8', row: 13, seat:23},
{id:448, cx:1261, cy:297, r:11, fill:'#A753A8', row: 13, seat:24},
{id:449, cx:1299, cy:301, r:11, fill:'#A753A8', row: 13, seat:25},
{id:450, cx:1337, cy:305, r:11, fill:'#A753A8', row: 13, seat:26},
{id:451, cx:1373, cy:309, r:11, fill:'#A753A8', row: 13, seat:27},
{id:452, cx:1411, cy:313, r:11, fill:'#A753A8', row: 13, seat:28},
{id:453, cx:1449, cy:319, r:11, fill:'#A753A8', row: 13, seat:29},
{id:454, cx:1485, cy:325, r:11, fill:'#A753A8', row: 13, seat:30},
{id:455, cx:1523, cy:329, r:11, fill:'#A753A8', row: 13, seat:31},
{id:456, cx:1561, cy:335, r:11, fill:'#A753A8', row: 13, seat:32},
{id:457, cx:385, cy:281, r:11, fill:'#A753A8', row: 14, seat:1},
{id:458, cx:423, cy:275, r:11, fill:'#A753A8', row: 14, seat:2},
{id:459, cx:459, cy:271, r:11, fill:'#A753A8', row: 14, seat:3},
{id:460, cx:497, cy:265, r:11, fill:'#A753A8', row: 14, seat:4},
{id:461, cx:535, cy:261, r:11, fill:'#A753A8', row: 14, seat:5},
{id:462, cx:571, cy:257, r:11, fill:'#A753A8', row: 14, seat:6},
{id:463, cx:609, cy:255, r:11, fill:'#A753A8', row: 14, seat:7},
{id:464, cx:647, cy:251, r:11, fill:'#A753A8', row: 14, seat:8},
{id:465, cx:685, cy:249, r:11, fill:'#A753A8', row: 14, seat:9},
{id:466, cx:723, cy:247, r:11, fill:'#A753A8', row: 14, seat:10},
{id:467, cx:759, cy:245, r:11, fill:'#6DD7DF', row: 14, seat:11},
{id:468, cx:797, cy:243, r:11, fill:'#6DD7DF', row: 14, seat:12},
{id:469, cx:835, cy:241, r:8, fill:'#D9D9D9', row: 14, seat:13},
{id:470, cx:875, cy:241, r:8, fill:'#D9D9D9', row: 14, seat:14},
{id:471, cx:997, cy:241, r:8, fill:'#D9D9D9', row: 14, seat:15},
{id:472, cx:1035, cy:241, r:8, fill:'#D9D9D9', row: 14, seat:16},
{id:473, cx:1073, cy:243, r:11, fill:'#6DD7DF', row: 14, seat:17},
{id:474, cx:1111, cy:243, r:11, fill:'#6DD7DF', row: 14, seat:18},
{id:475, cx:1149, cy:245, r:11, fill:'#A753A8', row: 14, seat:19},
{id:476, cx:1187, cy:249, r:11, fill:'#A753A8', row: 14, seat:20},
{id:477, cx:1223, cy:251, r:11, fill:'#A753A8', row: 14, seat:21},
{id:478, cx:1261, cy:253, r:11, fill:'#A753A8', row: 14, seat:22},
{id:479, cx:1299, cy:257, r:11, fill:'#A753A8', row: 14, seat:23},
{id:480, cx:1337, cy:261, r:11, fill:'#A753A8', row: 14, seat:24},
{id:481, cx:1373, cy:265, r:8, fill:'#D9D9D9', row: 14, seat:25},
{id:482, cx:1373, cy:265, r:11, fill:'#A753A8', row: 14, seat:26},
{id:483, cx:1411, cy:269, r:11, fill:'#A753A8', row: 14, seat:27},
{id:484, cx:1449, cy:275, r:11, fill:'#A753A8', row: 14, seat:28},
{id:485, cx:1485, cy:279, r:11, fill:'#A753A8', row: 14, seat:29},
{id:486, cx:497, cy:221, r:11, fill:'#A753A8', row: 15, seat:1},
{id:487, cx:535, cy:217, r:11, fill:'#A753A8', row: 15, seat:2},
{id:488, cx:573, cy:213, r:11, fill:'#A753A8', row: 15, seat:3},
{id:489, cx:609, cy:211, r:11, fill:'#A753A8', row: 15, seat:4},
{id:490, cx:647, cy:207, r:11, fill:'#A753A8', row: 15, seat:5},
{id:491, cx:685, cy:205, r:11, fill:'#A753A8', row: 15, seat:6},
{id:492, cx:723, cy:203, r:11, fill:'#A753A8', row: 15, seat:7},
{id:493, cx:761, cy:201, r:11, fill:'#6DD7DF', row: 15, seat:8},
{id:494, cx:799, cy:199, r:11, fill:'#6DD7DF', row: 15, seat:9},
{id:495, cx:835, cy:197, r:11, fill:'#6DD7DF', row: 15, seat:10},
{id:496, cx:875, cy:197, r:11, fill:'#6DD7DF', row: 15, seat:11},
{id:497, cx:997, cy:197, r:11, fill:'#6DD7DF', row: 15, seat:12},
{id:498, cx:1035, cy:197, r:11, fill:'#6DD7DF', row: 15, seat:13},
{id:499, cx:1073, cy:199, r:11, fill:'#6DD7DF', row: 15, seat:14},
{id:500, cx:1111, cy:199, r:11, fill:'#6DD7DF', row: 15, seat:15},
{id:501, cx:1149, cy:201, r:11, fill:'#A753A8', row: 15, seat:16},
{id:502, cx:1187, cy:203, r:11, fill:'#A753A8', row: 15, seat:17},
{id:503, cx:1225, cy:207, r:11, fill:'#A753A8', row: 15, seat:18},
{id:504, cx:1261, cy:209, r:11, fill:'#A753A8', row: 15, seat:19},
{id:505, cx:1299, cy:213, r:11, fill:'#A753A8', row: 15, seat:20},
{id:506, cx:1337, cy:217, r:11, fill:'#A753A8', row: 15, seat:21},
{id:507, cx:1375, cy:221, r:11, fill:'#A753A8', row: 15, seat:22},
{id:508, cx:571, cy:169, r:11, fill:'#A753A8', row: 16, seat:1},
{id:509, cx:609, cy:167, r:11, fill:'#A753A8', row: 16, seat:2},
{id:510, cx:647, cy:163, r:11, fill:'#A753A8', row: 16, seat:3},
{id:511, cx:685, cy:161, r:11, fill:'#A753A8', row: 16, seat:4},
{id:512, cx:721, cy:159, r:11, fill:'#A753A8', row: 16, seat:5},
{id:513, cx:759, cy:157, r:11, fill:'#6DD7DF', row: 16, seat:6},
{id:514, cx:797, cy:155, r:11, fill:'#6DD7DF', row: 16, seat:7},
{id:515, cx:835, cy:153, r:11, fill:'#6DD7DF', row: 16, seat:8},
{id:516, cx:875, cy:153, r:11, fill:'#6DD7DF', row: 16, seat:9},
{id:517, cx:997, cy:153, r:11, fill:'#6DD7DF', row: 16, seat:10},
{id:518, cx:1035, cy:153, r:11, fill:'#6DD7DF', row: 16, seat:11},
{id:519, cx:1073, cy:155, r:11, fill:'#6DD7DF', row: 16, seat:12},
{id:520, cx:1111, cy:155, r:11, fill:'#6DD7DF', row: 16, seat:13},
{id:521, cx:1149, cy:157, r:11, fill:'#A753A8', row: 16, seat:14},
{id:522, cx:1185, cy:159, r:11, fill:'#A753A8', row: 16, seat:15},
{id:523, cx:1223, cy:163, r:11, fill:'#A753A8', row: 16, seat:16},
{id:524, cx:1261, cy:165, r:11, fill:'#A753A8', row: 16, seat:17},
{id:525, cx:1299, cy:169, r:11, fill:'#A753A8', row: 16, seat:18},
{id:526, cx:11, cy:469, r:11, fill:'#A753A8', row: 16, seat:19},
{id:527, cx:37, cy:437, r:11, fill:'#A753A8', row: 17, seat:1},
{id:528, cx:63, cy:405, r:11, fill:'#A753A8', row: 17, seat:2},
{id:529, cx:91, cy:375, r:11, fill:'#A753A8', row: 17, seat:3},
{id:530, cx:119, cy:347, r:11, fill:'#A753A8', row: 17, seat:4},
{id:531, cx:209, cy:267, r:11, fill:'#A753A8', row: 17, seat:5},
{id:532, cx:241, cy:243, r:11, fill:'#A753A8', row: 17, seat:6},
{id:533, cx:273, cy:219, r:11, fill:'#A753A8', row: 17, seat:7},
{id:534, cx:307, cy:197, r:11, fill:'#A753A8', row: 17, seat:8},
{id:535, cx:343, cy:175, r:11, fill:'#A753A8', row: 17, seat:9},
{id:536, cx:447, cy:119, r:11, fill:'#A753A8', row: 17, seat:10},
{id:537, cx:485, cy:103, r:11, fill:'#A753A8', row: 17, seat:11},
{id:538, cx:523, cy:87, r:11, fill:'#A753A8', row: 17, seat:12},
{id:539, cx:561, cy:73, r:11, fill:'#A753A8', row: 17, seat:13},
{id:540, cx:601, cy:61, r:11, fill:'#A753A8', row: 17, seat:14},
{id:541, cx:715, cy:31, r:8, fill:'#D9D9D9', row: 17, seat:15},
{id:542, cx:755, cy:25, r:11, fill:'#A753A8', row: 17, seat:16},
{id:543, cx:797, cy:19, r:11, fill:'#A753A8', row: 17, seat:17},
{id:544, cx:837, cy:15, r:11, fill:'#A753A8', row: 17, seat:18},
{id:545, cx:877, cy:11, r:11, fill:'#A753A8', row: 17, seat:19},
{id:546, cx:997, cy:11, r:8, fill:'#D9D9D9', row: 17, seat:20},
{id:547, cx:1037, cy:13, r:11, fill:'#A753A8', row: 17, seat:21},
{id:548, cx:1079, cy:17, r:11, fill:'#A753A8', row: 17, seat:22},
{id:549, cx:1119, cy:23, r:11, fill:'#A753A8', row: 17, seat:23},
{id:550, cx:1159, cy:29, r:11, fill:'#A753A8', row: 17, seat:24},
{id:551, cx:1275, cy:57, r:11, fill:'#A753A8', row: 17, seat:25},
{id:552, cx:1313, cy:69, r:11, fill:'#A753A8', row: 17, seat:26},
{id:553, cx:1353, cy:81, r:11, fill:'#A753A8', row: 17, seat:27},
{id:554, cx:1391, cy:97, r:11, fill:'#A753A8', row: 17, seat:28},
{id:555, cx:1429, cy:113, r:11, fill:'#A753A8', row: 17, seat:29},
{id:556, cx:1533, cy:167, r:11, fill:'#A753A8', row: 17, seat:30},
{id:557, cx:1569, cy:187, r:11, fill:'#A753A8', row: 17, seat:31},
{id:558, cx:1603, cy:209, r:11, fill:'#A753A8', row: 17, seat:32},
{id:559, cx:1637, cy:233, r:11, fill:'#A753A8', row: 17, seat:33},
{id:560, cx:1669, cy:257, r:11, fill:'#A753A8', row: 17, seat:34},
{id:561, cx:1759, cy:335, r:11, fill:'#A753A8', row: 17, seat:35},
{id:562, cx:1789, cy:363, r:11, fill:'#A753A8', row: 17, seat:36},
{id:563, cx:1817, cy:393, r:11, fill:'#A753A8', row: 17, seat:37},
{id:564, cx:1843, cy:425, r:11, fill:'#A753A8', row: 17, seat:38},
{id:565, cx:1869, cy:455, r:11, fill:'#A753A8', row: 17, seat:39},

        ],
        colorPrices: {
          '#14B5FF': 5000,
          '#D9207A': 2500,
          '#8C12CA': 3200,
          '#FF9500': 1500,
          '#84C28E': 1200,
          '#A753A8': 750,
          '#6DD7DF': 1000,
        },
        selectedCircle: null,
        selectedDate: null,
      };
    },
    
    mounted(){

    },
    watch: {
    '$route.query.priceGroup': {
      immediate: true,
      handler(newVal) {
        this.highlightCircles(newVal);
      }
    }
   },
    computed: {
        totalPrice() {
            return this.circles.reduce((sum, circle) => {
                return sum + (circle.fill === '#000000' ? this.colorPrices[circle.originalFill] : 0);
            }, 0);
        },
        selectedCircleInfo() {
            return this.circles.filter(circle => circle.fill === '#000000').map(circle => ({
                row: circle.row,
                seat: circle.seat
            }));
        },
        
    },
    methods: {
      highlightCircles(priceGroup) {
    this.circles.forEach(circle => {
      // If the circle has not been interacted with before, store its original color
      if (!circle.originalFill) {
        circle.originalFill = circle.fill;
      }

      // If there is no priceGroup, revert all non-selected circles to their original color
      if (!priceGroup) {
        circle.fill = circle.isSelected ? '#000000' : circle.originalFill;
      } else {
        // If there is a priceGroup, highlight the matching circles and maintain selected circles
        if (circle.isSelected) {
          circle.fill = '#000000';
        } else if (priceGroup === circle.originalFill) {
          circle.fill = circle.originalFill;
        } else {
          circle.fill = '#D9D9D9';
        }
      }
    });
  },
  chooseCircle(circle) {
    // Skip if the circle is inactive
    if (circle.fill === '#D9D9D9') return;

    // Toggle the selected state and update color
    if (!circle.isSelected) {
      circle.isSelected = true;
      circle.fill = '#000000';
    } else {
      circle.isSelected = false;
      circle.fill = circle.originalFill; // Revert to original color
    }

    // Update the query parameters
    this.updateQueryParams();
  },
  updateQueryParams() {
  // Construct the new query parameters from the current selection
  const selectedSeatsParam = this.selectedCircleInfo.map(info => `${info.seat}`).join(',');
  const selectedRowsParam = this.selectedCircleInfo.map(info => info.row).join(',');
  const totalPriceParam = this.totalPrice;
  
  // Preserve existing query parameters and update/add new ones
  const newQuery = {
      ...this.$route.query,
      seats: selectedSeatsParam,
      rows: selectedRowsParam,
      totalprice: totalPriceParam,
      // Keep the date if it exists
      date: this.$route.query.date,
      hour: this.$route.query.hour,
  };

  // Update the query without adding to history
  this.$router.replace({ path: this.$route.path, query: newQuery }).catch(err => {
      if (err.name !== 'NavigationDuplicated') {
          throw err;
      }
  });
},

generateURL() {
  // Debugging: Log current route query
  console.log('Current Route Query:', this.$route.query);

  const selectedSeatsParam = this.selectedCircleInfo.map(info => `${info.seat}`).join(',');
  const selectedRowsParam = this.selectedCircleInfo.map(info => info.row).join(',');
  const totalPriceParam = this.totalPrice;
  const dateFromQuery = this.$route.query.date;
  const hourFromQuery = this.$route.query.hour;

  // Debugging: Log the variables
  console.log('Date from Query:', dateFromQuery);
  console.log('Hour from Query:', hourFromQuery);

  this.$router.push({
      path: `${this.$route.path}/payment`,
      query: {
          seats: selectedSeatsParam,
          rows: selectedRowsParam,
          totalprice: totalPriceParam,
          date: dateFromQuery,
          hour: hourFromQuery,
      }
  }).then(() => {
    // Debugging: Log success
    console.log('Navigation successful');
  }).catch(err => {
    // Debugging: Log any errors
    console.error('Router push error:', err);
  });
},



},
  };
  </script>
  
  <style>
.custom-btn {
  background: transparent;
  border: 1px solid #4781ff;
  color: #4781ff;
  display: flex;
  align-items: center;

}

.btn-icon {
  fill: #4781ff; /* SVG color */
  vertical-align: middle; /* Aligns the SVG with the text */
}
  </style>
  
  