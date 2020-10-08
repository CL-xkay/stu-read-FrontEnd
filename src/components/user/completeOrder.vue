<template>
  <div class="mainBox">
    <span>
      您选择了：{{ area[0] }} 楼 {{ area[1] }} 区 {{ selection + 1 }} 号座位
    </span>
    <span>预约时间为：明天 {{ time }}</span>
    <div class="stepBox">
      <Button type="primary" @click="previous" style="float: left">
        上一步
      </Button>
      <Button type="primary" @click="confirm" style="float: right">
        确认预约
      </Button>
    </div>
  </div>
</template>

<script>
import { orderSeat } from "../../api/api";

export default {
  name: "completeOrder",
  data() {
    return {
      area: this.$parent.selectedArea,
      selection: this.$parent.selectedSeat,
      start: "",
      end: "",
      time: this.start + "-" + this.end
    };
  },
  methods: {
    previous() {
      this.$emit("nextStep", 1);
    },
    async confirm() {
      const data = {};
      data.id = this.$store.state.userId;
      data.floor = Number(this.area[0]);
      data.area = this.area[1];
      data.seat = this.selection + 1;
      const t = new Date();
      const y = t.getFullYear();
      const m = t.getMonth() + 1;
      const r = t.getDate() + 1;
      data.date = y + "-" + m + "-" + r;
      data.start = this.start + ":00";
      data.end = this.end + ":00";
      // console.log(JSON.parse(JSON.stringify(data)));

      const d = (await orderSeat(data)).data;
      console.log(d);
      if (d.res === 0) {
        this.$Notice.success({
          title: d.msg,
          duration: 2
        });
      } else {
        this.$Notice.error({
          title: d.msg,
          duration: 2
        });
      }
    },
    change() {
      const val = this.$parent.selectedTime;
      const startH = Math.floor(val[0]);
      const startM = (val[0] - startH) * 60;
      let start = "";
      if (startM === 0) {
        start = startH + ":00";
      } else {
        start = startH + ":" + startM;
      }
      this.start = start;

      const endH = Math.floor(val[1]);
      const endM = (val[1] - endH) * 60;
      let end = "";
      if (endM === 0) {
        end = endH + ":00";
      } else {
        end = endH + ":" + endM;
      }
      this.end = end;

      this.time = start + "-" + end;
    }
  },
  mounted() {
    this.change();
  }
};
</script>

<style scoped>
.mainBox {
}

span {
  font-weight: bold;
  font-size: 1rem;
  display: block;
  margin-top: 3%;
}

.stepBox {
  margin-top: 3%;
}
</style>
