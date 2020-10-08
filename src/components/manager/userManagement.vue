<template>
  <div class="mainBox">
    <div class="title">
      <Icon type="ios-pulse" size="23" />
      <h3>所有用户</h3>
    </div>
    <div class="b_table">
      <Table max-height="400" :columns="columns1" :data="data1">
        <template slot-scope="{ row }" slot="action1">
          <Button
            type="primary"
            size="small"
            shape="circle"
            icon="ios-create-outline"
            @click="editTel(row)"
          ></Button>
        </template>
        <template slot-scope="{ row }" slot="action2">
          <Button
            type="primary"
            size="small"
            shape="circle"
            icon="ios-create-outline"
            @click="editEml(row)"
          ></Button>
        </template>
      </Table>
    </div>
    <Modal v-model="modelEditTel" title="修改用户信息" width="300" draggable>
      <Form>
        <FormItem label="用户编号">
          <Input v-model="editId" disabled />
        </FormItem>
        <FormItem label="新手机号码">
          <Input v-model="newTel" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="InformationChanged"
          >提交</Button
        >
      </div>
    </Modal>
    <Modal v-model="modelEditEml" title="修改用户信息" width="300" draggable>
      <Form>
        <FormItem label="用户编号">
          <Input v-model="editId" disabled />
        </FormItem>
        <FormItem label="新电子邮箱">
          <Input v-model="newEmail" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" long @click="InformationChanged"
          >提交</Button
        >
      </div>
    </Modal>
    <div style="margin-top: 15px">
      <Button size="large" icon="ios-add" type="primary" @click="add = true"
        >添加新用户</Button
      >
    </div>
    <Modal v-model="add" title="新用户信息" draggable>
      <Form :model="formUser" label-position="left" :label-width="80">
        <FormItem label="编号">
          <Input v-model="formUser.CID" />
        </FormItem>
        <FormItem label="姓名">
          <Input v-model="formUser.CNAME" />
        </FormItem>
        <FormItem label="性别">
          <Input v-model="formUser.CSEX" />
        </FormItem>
        <FormItem label="年龄">
          <Input v-model="formUser.CAGE" />
        </FormItem>
        <FormItem label="手机号码">
          <Input v-model="formUser.CTEL" />
        </FormItem>
        <FormItem label="电子邮箱">
          <Input v-model="formUser.CEMAIL" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="confirm" long>提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {addUser, changeEmail, changeTel, getTotalUsers} from "../../api/api";

export default {
  name: "userManagement",
  data() {
    return {
      columns1: [
        {
          title: "编号",
          key: "id",
          fixed: "left",
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "性别",
          key: "sex",
          align: "center"
        },
        {
          title: "年龄",
          key: "age",
          align: "center"
        },
        {
          title: "手机号码",
          key: "tel",
          align: "center"
        },
        {
          slot: "action1",
          align: "center",
          width: 50
        },
        {
          title: "电子邮箱",
          key: "email",
          width: 180,
          align: "center"
        },
        {
          slot: "action2",
          align: "center",
          width: 50
        }
      ],
      data1: [{}],
      add: false,
      formUser: {
        CID: "",
        CNAME: "",
        CSEX: "",
        CAGE: "",
        CTEL: "",
        CEMAIL: ""
      },
      editId: "",
      modelEditTel: false,
      modelEditEml: false,
      newTel: "",
      newEmail: ""
    };
  },
  methods: {
    async listAllUsers() {
      let flag = (await getTotalUsers()).data;
      this.data1 = flag.data;
    },
    editTel(row) {
      this.modelEditTel = true;
      this.editId = row.id;
      console.log(row.id);
    },
    editEml(row) {
      this.modelEditEml = true;
      this.editId = row.id;
      console.log(row.id);
    },
    async InformationChanged() {
      if (this.modelEditTel === true) {
        let flag = (await changeTel(this.editId, this.newTel)).data;
        if (flag.res === 0) {
          this.$Message.success({
            content: flag.msg,
            duration: 2
          });
          this.modelEditTel = false;
          location.reload();
        } else {
          this.$Message.error({
            content: flag.msg,
            duration: 2
          });
        }
      } else {
        let flag = (await changeEmail(this.editId, this.newEmail)).data;
        if (flag.res === 0) {
          this.$Message.success({
            content: flag.msg,
            duration: 2
          });
          this.modelEditEml = false;
          location.reload();
        } else {
          this.$Message.error({
            content: flag.msg,
            duration: 2
          });
        }
      }
    },
    async confirm() {
      let flag = (await addUser(this.formUser)).data;
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
    this.listAllUsers();
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
.b_table {
  margin-top: 20px;
}
</style>
