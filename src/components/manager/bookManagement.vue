<template>
  <div class="mainBox">
    <div class="title">
      <Icon type="ios-pulse" size="23" />
      <h3>所有书籍</h3>
    </div>
    <div class="book_table">
      <Table max-height="400" :columns="columns1" :data="data1">
        <template slot-scope="{ row }" slot="action">
          <Button type="primary" size="small" @click="edit(row)"
            >修改</Button
          >
        </template>
      </Table>
    </div>
    <Modal v-model="modelEdit" title="修改馆藏数" width="300" draggable>
      <Form>
        <FormItem>
          <Input v-model="newNum" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="numChanged">提交</Button>
      </div>
    </Modal>
    <div style="margin-top: 15px">
      <Button size="large" icon="ios-add" type="primary" @click="add = true">添加新书</Button>
    </div>
    <Modal v-model="add" title="新书信息" draggable>
      <Form
        :model="formBook"
        label-position="left"
        :label-width="80"
      >
        <FormItem label="编号">
          <Input v-model="formBook.id" />
        </FormItem>
        <FormItem label="ISBN号">
          <Input v-model="formBook.isbn" />
        </FormItem>
        <FormItem label="书名">
          <Input v-model="formBook.name" />
        </FormItem>
        <FormItem label="作者">
          <Input v-model="formBook.author" />
        </FormItem>
        <FormItem label="出版社">
          <Input v-model="formBook.press" />
        </FormItem>
        <FormItem label="出版时间">
          <Input v-model="formBook.prym" />
        </FormItem>
        <FormItem label="馆藏数">
          <Input v-model="formBook.num" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="confirm" long>提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getTotalbook, editBookNum, addBook} from "../../api/api";

export default {
  name: "bookManagement",
  data() {
    return {
      columns1: [
        {
          title: "编号",
          key: "BID",
          fixed: "left",
          width: 120,
          align: "center"
        },
        {
          title: "ISBN",
          key: "BISBN",
          width: 100,
          tooltip: true,
          align: "center"
        },
        {
          title: "书名",
          key: "BNAME",
          width: 120,
          align: "center"
        },
        {
          title: "作者",
          key: "BAUTHOR",
          width: 100,
          align: "center"
        },
        {
          title: "出版社",
          key: "BPRESS",
          // width: 120,
          tooltip: true,
          align: "center"
        },
        {
          title: "出版年月",
          key: "BPRYM",
          width: 90,
          align: "center"
        },
        {
          title: "馆藏数",
          key: "BNUM",
          align: "center",
          width: 75
        },
        {
          title: "已借数",
          key: "BREM",
          align: "center",
          width: 75
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          fixed: "right",
          width: 70
        }
      ],
      data1: [{}],
      modelEdit: false,
      newNum: "",
      editId: "",
      add: false,
      formBook: {
        id: "",
        isbn: "",
        name: "",
        author: "",
        press: "",
        prym: "",
        num: ""
      }
    };
  },
  methods: {
    async listAllBooks() {
      let flag = (await getTotalbook()).data;
      this.data1 = flag.data;
    },
    edit(row) {
      this.modelEdit = true;
      this.editId = row.BID;
      console.log(row.BID);
    },
    async numChanged() {
      console.log(this.newNum);
      let flag = (await editBookNum(this.editId, this.newNum)).data;
      if (flag.res === 0) {
        this.$Notice.success({
          title: flag.msg,
          duration: 2
        });
        this.modelEdit = false;
        location.reload();
      } else {
        this.$Notice.error({
          title: flag.msg,
          duration: 2
        });
      }
    },
    async confirm() {
      let flag = (await addBook(this.formBook)).data;
      if (flag.res === 0) {
        this.$Notice.success({
          title: flag.msg,
          duration: 2
        });
        this.add = false;
        location.reload();
      } else {
        this.$Notice.error({
          title: flag.msg,
          duration: 2
        });
      }
      console.log(this.formBook);
    }
  },
  mounted() {
    this.listAllBooks();
  }
};
</script>

<style scoped>
.mainBox {
  flex-direction: column;
}
.title {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.book_table {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}
</style>
