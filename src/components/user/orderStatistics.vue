<template>
  <div class="mainBox">
    <h2>
      过去的一年里，我一共去了{{ totalTimes }}次自习室，自习了{{
        totalHour
      }}小时{{ totalMinutes }}分钟
    </h2>
    <div id="myChart2" style="width:65%;height:250px;margin-top: 15px"></div>
    <div id="myChart" style="width:60%;height:350px;"></div>
  </div>
</template>

<script>
import { timesStatistic, orderTimeStatistic } from "../../api/api";

export default {
  name: "orderStatistics",
  data() {
    return {
      month1: [],
      month2: [],
      num: [],
      time: []
    };
  },
  computed: {
    totalTimes() {
      let sum = 0;
      for (let i = 0; i < this.num.length; i++) {
        sum += this.num[i];
      }
      return sum;
    },
    totalDuration() {
      let sum = 0;
      for (let i = 0; i < this.time.length; i++) {
        sum += this.time[i];
      }
      return sum;
    },
    totalHour() {
      let hour = this.totalDuration;
      return parseInt(hour);
    },
    totalMinutes() {
      let hour = this.totalDuration;
      let minutes = hour - parseInt(hour);
      return minutes * 60;
    }
  },
  methods: {
    draw: async function() {
      let flag = (await orderTimeStatistic(this.$store.state.userId)).data;
      flag.data.map(item => {
        this.month1.push(item.month);
      });
      flag.data.map(item => {
        this.time.push(item.time);
      });
      let myChart2 = this.echarts.init(document.getElementById("myChart2"));
      myChart2.setOption({
        title: {
          text: "分月时间统计",
          left: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          name: "时间",
          type: "category",
          boundaryGap: false,
          data: this.month1
        },
        yAxis: {
          name: "小时",
          type: "value"
        },
        series: {
          type: "line",
          data: this.time
        }
      });
    },
    draw2: async function() {
      let flag = (await timesStatistic(this.$store.state.userId)).data;
      this.totalMessage = flag.data;
      flag.data.map(item => {
        this.month2.push(item.month);
      });
      flag.data.map(item => {
        this.num.push(item.num);
      });
      let myChart = this.echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: {
          text: "分月次数统计",
          left: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          name: "时间",
          type: "category",
          boundaryGap: false,
          data: this.month2
        },
        yAxis: {
          name: "次数",
          type: "value",
          interval: 1
        },
        series: {
          type: "line",
          data: this.num
        }
      });
    }
  },
  mounted() {
    this.draw();
    this.draw2();
  }
};
</script>

<style scoped>
.mainBox {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
