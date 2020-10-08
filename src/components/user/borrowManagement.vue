<template>
  <div class="mainBox">
    <div class="title">
      <Icon type="ios-pulse" size="23" />
      <h3>待归还</h3>
    </div>
    <div v-if="borrowList.length === 0" style="margin-top: 10px">
      <Alert show-icon>
        <template slot="desc">您暂无待归还书籍，快去借阅吧！</template>
      </Alert>
    </div>
    <div v-else class="b_table">
      <Table :columns="borrowing" :data="borrowList">
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
    <div class="title">
      <Icon type="ios-pulse" size="23" />
      <h3>已归还</h3>
    </div>
    <div v-if="returnedList.length === 0" style="margin-top: 10px">
      <Alert show-icon>
        <template slot="desc">您暂无已归还书籍</template>
      </Alert>
    </div>
    <div v-else class="b_table">
      <Table :columns="returned" :data="returnedList"></Table>
    </div>
  </div>
</template>

<script>
import { listBorrowed, returnBook, listReturned } from "../../api/api";

export default {
  name: "borrowManagement",
  data: function() {
    return {
      borrowing: [
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
          title: "作者",
          key: "author",
          align: "center"
        },
        {
          title: "出版社",
          key: "press",
          align: "center",
          tooltip: "50"
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
      returned: [
        {
          title: "ISBN号",
          key: "isbn",
          align: "center"
        },
        {
          title: "书名",
          key: "name",
          align: "center"
        },
        {
          title: "作者",
          key: "author",
          align: "center"
        },
        {
          title: "出版社",
          key: "press",
          align: "center"
        },
        {
          title: " 借阅日期",
          key: "b_time",
          align: "center"
        },
        {
          title: "归还日期",
          key: "e_time",
          align: "center"
        }
      ],
      borrowList: [{}],
      returnedList: [{}]
    };
  },
  methods: {
    listBorrowBook: async function() {
      let flag = (await listBorrowed(this.$store.state.userId)).data;
      this.borrowList = flag.data;
    },
    giveBack: async function(row) {
      console.log(row.id);
      let flag = (await returnBook(this.$store.state.userId, row.id)).data;
      if (flag.res === 0) {
        this.$Notice.success({
          title: flag.msg,
          duration: 2
        });
      } else if (flag.res === 1) {
        this.$Notice.error({
          title: flag.msg,
          duration: 2
        });
      } else {
        this.$Notice.error({
          title: flag.msg,
          duration: 2
        });
      }
      location.reload();
    },
    listReturnedBook: async function() {
      let flag = (await listReturned(this.$store.state.userId)).data;
      this.returnedList = flag.data;
    }
  },
  async mounted() {
    this.listBorrowBook();
    this.listReturnedBook();
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
