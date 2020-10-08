<template>
  <div>
    <div id="myChart" style="width:100%;height:500px;margin-top: 15px"></div>
    <div id="myChart2" style="width:100%;height:250px;margin-top: 15px"></div>
  </div>
</template>

<script>
import { userStatistic, userBookStatistic } from "../../api/api";

export default {
  name: "Statistics",
  data() {
    return {
      data1: [],
      man: [],
      woman: [],
      children: [],
      data2: [],
      data3: []
    };
  },
  methods: {
    async draw() {
      let flag = (await userStatistic()).data;
      flag.data.map(item => {
        this.data1.push({
          name: item.Label,
          value: item.Nnm,
          children: [
            {
              value: item.male,
              name: "男",
              itemStyle: {
                color: "#F54F4A"
              }
            },
            {
              value: item.female,
              name: "女",
              itemStyle: {
                color: "#FF8C75"
              }
            }
          ]
        });
      });
      let myChart = this.echarts.init(document.getElementById("myChart"));
      myChart.setOption({
        title: {
          text: "用户画像",
          left: "left"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c}人"
        },
        series: [
          {
            name: "用户画像",
            type: "sunburst",
            center: ["50%", "50%"],
            data: this.data1,
            levels: [
              {},
              {
                r0: "20%",
                r: "58%",
                itemStyle: {
                  borderWidth: 2
                },
                label: {
                  rotate: "radial",
                  downplay: {
                    label: {
                      opacity: 0.5
                    }
                  }
                }
              },
              {
                r0: "60%",
                r: "80%",
                label: {
                  align: "center"
                }
              }
            ],
            label: {
              normal: {
                formatter: "{b}"
              }
            }
          }
        ]
      });
    },
    async draw2() {
      let flag = (await userBookStatistic()).data;
      flag.data.map(item => {
        this.data3.push({ value: item.Nnm, name: item.Label });
      });
      console.log(this.data3);
      let myChart = this.echarts.init(document.getElementById("myChart2"));
      myChart.setOption({
        title: {
          text: "不同人群借书量统计",
          left: "left"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c}本 {d}%"
        },
        series: [
          {
            name: "类别统计",
            type: "pie",
            radius: "60%",
            // roseType: "angle",
            center: ["50%", "50%"],
            data: this.data3,
            label: {
              normal: {
                formatter: "{b}"
              }
            }
          }
        ]
      });
    }
  },
  async mounted() {
    this.draw();
    this.draw2();
  }
};
</script>

<style scoped></style>
