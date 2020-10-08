<template>
  <div class="mainBox">
    <h2>截止到目前为止的一年里，我总共借阅图书{{totalBooks}}本，其中{{maxMonth}}份借书数最多</h2>
    <div id="myChart" style="width:65%;height:250px;margin-top: 15px"></div>
    <div id="myChart2" style="width:60%;height:350px;"></div>
  </div>
</template>

<script>
import { categoryStatistic, timeStatistic} from "../../api/api";
export default {
  name: "bookStatistics",
  data: function() {
    return {
      types: [{}],
      totalMessage: [{}],
      month: [],
      num: []
    };
  },
  computed: {
    totalBooks() {
      let sum = 0;
      for (let i=0;i<this.num.length;i++){
        sum += this.num[i];
      }
      return sum;
    },
    maxMonth() {
      let max = this.num.indexOf(Math.max.apply(Math, this.num));
      return this.month[max];
    }
  },
  methods: {
    draw: async function() {
      let flag = (await categoryStatistic(this.$store.state.userId)).data;
      this.types = flag.data;
      let myChart = this.echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: {
          text: "借书类别统计",
          left: "center"
        },
        tooltip: {
          trigger: 'item',
          formatter: "{b} {c}本<br/>{d}%"
        },
        series: [
          {
            name: "类别统计",
            type: "pie",
            radius: "55%",
            // roseType: "angle",
            center: ["50%", "50%"],
            data: this.types,
            label: {
              normal: {
                formatter: "{b} : {c}本 ({d}%)"
              }
            }
          }
        ]
      });
    },
    draw2: async function() {
      let flag = (await timeStatistic(this.$store.state.userId)).data;
      this.totalMessage = flag.data;
      flag.data.map(item => {
        this.month.push(item.month);
      });
      flag.data.map(item => {
        this.num.push(item.num);
      });
      let myChart2 = this.echarts.init(document.getElementById("myChart2"));
      myChart2.setOption({
        title: {
          text: "分月数量统计",
          left: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          name: "时间",
          type: "category",
          boundaryGap: false,
          data: this.month
        },
        yAxis: {
          name: "本数",
          type: "value"
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
