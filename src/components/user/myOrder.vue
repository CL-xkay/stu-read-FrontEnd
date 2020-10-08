<template>
  <div class="mainBox">
    <Alert show-icon v-if="!isOrdered">
      <template slot="desc">您暂无已预约座位，快去预约吧！</template>
    </Alert>
    <div v-else>
      <div class="titleBox">
        <Icon type="ios-pulse" size="23" />
        <h3>我的预约</h3>
      </div>
      <div v-if="orderInfo.length === 0">
        <Alert show-icon>
          <template slot="desc">您暂无待完成预约！</template>
        </Alert>
      </div>
      <Table :columns="col" :data="orderInfo" v-else>
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" @click="remove(row)">
            取消预订
          </Button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import { getOrders, deleteOrder } from "../../api/api";

export default {
  name: "myOrder",
  data() {
    return {
      col: [
        {
          title: "日期",
          key: "date"
        },
        {
          title: "开始时间",
          key: "start"
        },
        {
          title: "结束时间",
          key: "end"
        },
        {
          title: "楼号",
          key: "floor"
        },
        {
          title: "区号",
          key: "area"
        },
        {
          title: "座位号",
          key: "seat"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      isOrdered: true,
      orderInfo: [],
      simpleOrderInfo: {
        id: "",
        date: "",
        area: "",
        seat: "",
        start: "",
        end: "",
        floor: ""
      }
    };
  },
  methods: {
    async remove(row) {
      // console.log(row);
      this.simpleOrderInfo.id = this.$store.state.userId;
      this.simpleOrderInfo.date = row.date;
      this.simpleOrderInfo.area = row.area;
      this.simpleOrderInfo.seat = row.seat;
      this.simpleOrderInfo.start = row.start;
      this.simpleOrderInfo.end = row.end;
      this.simpleOrderInfo.floor = row.floor;
      console.log(this.simpleOrderInfo);
      let flag = (await deleteOrder(this.simpleOrderInfo)).data;
      if (flag.res === 0) {
        this.$Message.success({
          content: flag.msg,
          duration: 2
        });
        setTimeout("location.reload()",1000)
      } else {
        this.$Message.error({
          content: flag.msg,
          duration: 2
        });
      }
    },
    async getOrders() {
      const id = this.$store.state.userId;
      const d = (await getOrders(id)).data;
      // console.log(d);
      if (d.msg === 0) {
        this.orderInfo = d.data;
      }
    }
  },
  mounted() {
    this.getOrders();
  }
};
</script>

<style scoped>
.mainBox {
  flex-direction: column;
}

.titleBox {
  display: flex;
  flex-direction: row;
  margin-top: 3%;
  margin-bottom: 3%;
}
</style>
