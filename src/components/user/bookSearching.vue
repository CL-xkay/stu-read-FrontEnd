<template>
  <div class="mainBox">
    <div class="search">
      <Select style="width:100px" v-model="type">
        <Option
          v-for="item in wordList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</Option
        >
      </Select>
      <div style="margin-left: 20px">
        <Input
          search
          enter-button
          placeholder="请输入检索词"
          style="width: 300px"
          v-model="bookValue"
          @on-search="search"
        />
      </div>
    </div>
    <div v-show="ret === true" style="margin-top: 15px;width: 80%">
      <Alert show-icon>
        <template slot="desc">不好意思，暂无搜索匹配项</template>
      </Alert>
    </div>
    <!--    <div v-show="data1.length !== 0" style="width: 100%">-->
    <div class="book_table" v-if="data1.length !== 0 && isClick === true" style="width: 100%">
      <Table :columns="columns1" :data="data1">
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" @click="borrowBook(row)"
            >借阅</Button
          >
        </template>
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" :current="1" :page-size="pageSize" show-total show-elevator show-sizer
                @on-change="changePage" @on-page-size-change="pageSizeChange"></Page>
        </div>
      </div>
    </div>
    <!--    </div>-->
  </div>
</template>

<script>
import { searchBook, bookBorrow } from "../../api/api";
export default {
  name: "Test",
  data() {
    return {
      type: "",
      bookValue: "",
      wordList: [
        {
          value: "keyword",
          label: "关键字"
        },
        {
          value: "author",
          label: "作者"
        },
        {
          value: "isbn",
          label: "ISBN"
        }
      ],
      columns1: [
        {
          title: "编号",
          key: "id",
          fixed: "left",
          width: 120,
          align: "center"
        },
        {
          title: "ISBN",
          key: "isbn",
          width: 100,
          // tooltip: true,
          align: "center"
        },
        {
          title: "书名",
          key: "name",
          width: 100,
          align: "center"
        },
        {
          title: "作者",
          key: "author",
          width: 110,
          align: "center"
        },
        {
          title: "出版社",
          key: "press",
          width: 120,
          // tooltip: true,
          align: "center"
        },
        {
          title: "出版年月",
          key: "pry",
          width: 100,
          align: "center"
        },
        {
          title: "馆藏数",
          key: "total",
          align: "center",
          width: 75
        },
        {
          title: "已借数",
          key: "num",
          align: "center",
          width: 75
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          fixed: "right",
          width: 75
        }
      ],
      totalData: [{}],
      data1: [{}],
      total: 0,
      pageSize: 10,
      ret: false,
      isClick: false
    };
  },
  methods: {
    search: async function() {
      this.isClick = true;
      // console.log(this.bookValue);
      let flag = (await searchBook(this.type, this.bookValue)).data;
      // 总的数据条数
      this.total = flag.data.length;
      this.totalData = flag.data;
      if (flag.res === 0) {
        this.data1 = this.totalData.slice(0, this.pageSize);
        this.ret = this.data1.length === 0;
      }
      if (flag.res === 1) {
        this.$Notice.error({
          title: flag.msg,
          duration: 2
        });
        this.ret = true;
        this.data1.length = 0;
      }
    },
    changePage(page) {
      this.data1 = this.totalData.slice((page - 1) * this.pageSize, page * this.pageSize);
    },
    pageSizeChange(pageNum) {
      this.pageSize = pageNum;
    },
    borrowBook: async function(row) {
      console.log(row.id);
      let flag = (await bookBorrow(this.$store.state.userId, row.id)).data;
      console.log(flag.res);
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
    }
  }
};
</script>

<style scoped>
.mainBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.search {
  display: flex;
  flex-direction: row;
}
.book_table {
  margin-top: 3%;
  /*margin: 20px;*/
}
</style>
