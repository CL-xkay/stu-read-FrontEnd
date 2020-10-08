<template>
  <div class="mainBox">
    <div class="selectBox">
      <span style="display: block; font-size: 1rem; font-weight: bold">
        请选择：
      </span>
      <Cascader
        :data="data"
        v-model="area"
        trigger="hover"
        @on-change="selectArea"
        style="width: 30%"
      ></Cascader>
    </div>
    <div class="seatBox">
      <table>
        <thead>
          <tr>
            <th style="width: 15%">行\列</th>
            <th v-for="c in col" :key="c">{{ c }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in row" :key="r">
            <td>{{ r }}</td>
            <td v-for="c in col" :key="c">
              <img
                v-if="isAvailable[location(r, c)] === true"
                src="../../assets/available.png"
                @click="selectSeat(r, c)"
                alt="pic"
              />
              <img v-else src="../../assets/unavailable.png" alt="pic" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="remainBox">
      <h3 style="display: inline-block; float: left">剩余空位：{{ remain }}</h3>
      <Button
        type="primary"
        style="display: inline-block; float: right"
        @click="next"
        :disabled="!isSelected"
      >
        下一步
      </Button>
    </div>
  </div>
</template>

<script>
import { getAreas, getSeats } from "../../api/api";

export default {
  name: "selectSeat",
  props: {
    isSelectedSeat: Boolean,
    selectedSeat: Number,
    selectedArea: Array
  },
  data() {
    return {
      isSelected: this.isSelectedSeat, // 是否进行了选座
      selection: this.selectedSeat, // 选择的座位号
      row: [1, 2, 3, 4],
      col: [1, 2, 3, 4, 5],
      isAvailable: [],
      area: this.selectedArea,
      data: []
    };
  },
  methods: {
    async setAreas() {
      const d = (await getAreas()).data;

      // 转换数据
      let info = [];
      let i = 0; // i为数组info的下标
      let k = 0; // k为数组d的下标
      do {
        info[i] = {};
        info[i].value = d[k].floor;
        info[i].label = d[k].floor + "楼";
        info[i].children = [];
        for (let j = 0; j < d.length; j++) {
          info[i].children[j] = {};
          info[i].children[j].value = d[k].area;
          info[i].children[j].label = d[k].area + "区";
          if (k < d.length - 1 && d[k].floor === d[k + 1].floor) {
            k++;
          } else {
            break;
          }
        }
        i++;
        k++;
      } while (k < d.length);

      this.data = info;
      // 设置默认area
      if (this.isSelectedSeat === false) {
        console.log("设置默认区域");
        this.area[0] = info[0].value;
        this.area[1] = info[0].children[0].value;
        this.setSeats();
      }
    },

    selectArea(val) {
      if (this.isSelected === true) {
        // 在原区域已选过座位，先进行清除
        const d = this.selection;
        document.getElementsByTagName("img")[
          d
        ].src = require("../../assets/available.png");
        this.isSelected = false;
        this.selection = -1;
        this.$emit("clear");
      }

      this.area = val;
      this.setSeats();
    },

    async setSeats() {
      console.log("设置的座位属于区域：" + this.area[0] + "-" + this.area[1]);
      const d = (await getSeats(this.area)).data;

      if (d.res === 0) {
        this.isAvailable = d.isAvailable;

        console.log(d.isAvailable);
      }
    },

    selectSeat(r, c) {
      const d = (r - 1) * this.col.length + c - 1;
      let resource = document.getElementsByTagName("img")[d];
      if (!this.isSelected) {
        // 未选择过座位
        this.selection = d;
        resource.src = require("../../assets/select.png");
        this.isSelected = true; // 已经选座
      } else if (this.selection === d) {
        // 取消已选择的座位
        resource.src = require("../../assets/available.png");
        this.isSelected = false; // 未选座
        this.selection = -1;
        this.$emit("clear");
      } else {
        alert("不可重复选座，请取消后已选择座位后再次选座！");
      }
    },

    location(r, c) {
      return (r - 1) * this.col.length + c - 1; // 找到已经被预定的座位在isAvailable数组中的位置
    },

    next() {
      this.$emit("nextStep", 1);
    }
  },
  computed: {
    remain() {
      let n = 0;
      for (let i of this.isAvailable) {
        if (i === true) {
          n++;
        }
      }
      return n;
    }
  },
  created() {
    for (let i = 0; i < 20; i++) {
      this.isAvailable[i] = true;
    }
    this.setAreas();
  },
  mounted() {}
};
</script>

<style scoped>
.mainBox {
}

.selectBox {
  width: 100%;
  margin: 3% 0;
  display: flex;
  flex-direction: row;
}

.seatBox {
  width: 100%;
}

.remainBox {
  width: 100%;
}

table {
  width: 35%;
  margin: 2% auto;
}

img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
