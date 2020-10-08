<template>
  <div class="mainBox">
    <span style="margin-top: 3%">
      您选择了：{{ area[0] }} 楼 {{ area[1] }} 区 {{ selection + 1 }} 号座位
    </span>
    <div class="selectBox">
      <span>请选择预约时间：</span>
      <Slider
        v-model="time"
        range
        :step="0.5"
        :tip-format="format"
        :marks="marks"
        :min="min"
        :max="max"
        @on-change="selectTime"
      ></Slider>
    </div>
    <div class="availableBox">
      <span style="margin-bottom: 1%">可选择的时间段：</span>
      <span
        style="font-size: 0.8rem"
        v-for="(item, value) in availableTime"
        :key="value"
      >
        {{ item.start + "-" + item.end }}
      </span>
    </div>
    <div class="stepBox">
      <Button style="float: left" type="primary" @click="previous">
        上一步
      </Button>
      <Button
        style="float: right"
        type="primary"
        :disabled="!isSelected"
        @click="next"
      >
        下一步
      </Button>
    </div>
  </div>
</template>

<script>
import { getTime } from "../../api/api";

export default {
  name: "confirmTime",
  props: {
    isSelectedTime: Boolean,
    selectedTime: Array
  },
  data() {
    return {
      min: 8,
      max: 22,
      area: this.$parent.selectedArea,
      selection: this.$parent.selectedSeat,
      time: this.selectedTime,
      isSelected: this.isSelectedTime,
      availableNumber: 0,
      availableTime: [],
      marks: {}
    };
  },
  methods: {
    async getAvailableTime() {
      const d = (await getTime(this.area, this.selection + 1)).data;
      console.log(d);
      if (d.res === 0) {
        this.availableNumber = d.num;
        this.availableTime = d.data;
      }
    },
    format(val) {
      const m = (val - Math.floor(val)) * 60;
      if (m === 30) {
        return Math.floor(val) + ":" + m;
      } else {
        return Math.floor(val) + ":00";
      }
    },
    setMarks() {
      for (let i = 8; i <= 22; i++) {
        this.marks[i] = i + ":00";
      }
    },
    selectTime() {
      this.isSelected = this.time[1] - this.time[0] !== 0;
    },
    previous() {
      this.$emit("nextStep", 0);
    },
    next() {
      this.$emit("nextStep", 2);
    }
  },
  created() {
    this.setMarks();
    this.getAvailableTime();
  }
};
</script>

<style scoped>
.mainBox {
  flex-direction: column;
  align-items: flex-start;
}

span {
  font-weight: bold;
  font-size: 1rem;
  display: inline-block;
  margin: 0 auto;
}

.selectBox {
  margin-top: 3%;
}

.stepBox {
  width: 100%;
  margin-top: 8%;
}

.availableBox {
  margin-top: 6%;
  display: flex;
  flex-direction: column;
}
</style>
