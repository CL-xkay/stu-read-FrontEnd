<template>
  <div class="mainBox">
    <div class="title">
      <Icon type="ios-pulse" size="23" />
      <h3>借阅记录(未超时)</h3>
    </div>
    <div class="b_table">
      <Table :columns="borrowing" :data="borrowList"></Table>
    </div>
    <div class="title">
      <Icon type="ios-pulse" size="23" />
      <h3>已超时</h3>
    </div>
    <div class="b_table">
      <Table :columns="overTime" :data="overTimeList">
        <template slot-scope="{ row }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="giveBack(row)"
          >还书</Button
          >
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import { mListBorrowed, mListOverTime, mReturnBook } from "../../api/api";

export default {
  name: "borrowManagement",
  data() {
    return {
      borrowing: [
        {
          title: "用户Id",
          key: "cid",
          align: "center",
          tooltip: "50"
        },
        {
          title: "书籍Id",
          key: "bid",
          align: "center",
          tooltip: "50"
        },
        {
          title: "ISBN号",
          key: "isbn",
          align: "center",
          tooltip: "50"
        },
        {
          title: "书名",
          key: "name",
          align: "center"
        },
        {
          title: " 借阅日期",
          key: "b_time",
          align: "center"
        },
        {
          title: "应还日期",
          key: "e_time",
          align: "center"
        }
      ],
      borrowList: [{}],
      overTime: [
        {
          title: "用户Id",
          key: "cid",
          align: "center",
          tooltip: "50"
        },
        {
          title: "书籍Id",
          key: "bid",
          align: "center",
          tooltip: "50"
        },
        {
          title: "ISBN号",
          key: "isbn",
          align: "center",
          tooltip: "50"
        },
        {
          title: "书名",
          key: "name",
          align: "center"
        },
        {
          title: " 借阅日期",
          key: "b_time",
          align: "center"
        },
        {
          title: "应还日期",
          key: "e_time",
          align: "center"
        },
        {
          title: "操作",
          slot: "action",
          align: "center"
        }
      ],
      overTimeList: [{}]
    };
  },
  methods: {
    async listBorrowed() {
      let flag = (await mListBorrowed()).data;
      this.borrowList = flag.data;
    },
    async listOverTime() {
      let flag = (await mListOverTime()).data;
      this.overTimeList = flag.data;
    },
    async giveBack(row) {
      let flag = (await mReturnBook(row.cid, row.bid)).data;
      if (flag.res === 0) {
        this.$Message.success(flag.msg);
        location.reload();
      }
    }
  },
  mounted() {
    this.listBorrowed();
    this.listOverTime();
  }
};
</script>

<style scoped>
.mainBox {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.title {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.b_table {
  margin-top: 20px;
}
</style>
