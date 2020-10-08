<template>
  <div class="navBox">
    <span style="margin-left: 1.7%; font-weight: bold; font-size: 1.15rem">
      自 习 阅 览 室 管 理 系 统
    </span>
    <div class="infoBox" v-show="$store.state.userStatus === 'user'">
      <Dropdown @on-click="userClick">
        <span>欢迎用户 </span>
        <a>
          <span>{{ name }}</span>
          <Icon type="ios-arrow-down" color="white" size="17"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="personInfo">个人信息</DropdownItem>
          <DropdownItem name="pwdChange">修改密码</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal v-model="modal" title="修改密码" footer-hide draggable>
        <Form
          ref="formPwd"
          :model="formPwd"
          label-position="left"
          :label-width="85"
          :rules="ruleValidate"
        >
          <FormItem label="原密码" prop="pwd">
            <Input type="password" v-model="formPwd.pwd" />
          </FormItem>
          <FormItem label="新密码" prop="pwdChanged">
            <Input type="password" v-model="formPwd.pwdChanged" />
          </FormItem>
          <FormItem label="确认新密码" prop="pwdConfirm">
            <Input type="password" v-model="formPwd.pwdConfirm" />
          </FormItem>
          <FormItem>
            <Button type="primary" @click="confirm">提交</Button>
          </FormItem>
        </Form>
      </Modal>
      <a>
        <Icon type="md-exit" color="white" size="17" />
        <span @click="loginOut">退出</span>
      </a>
    </div>
    <div class="infoBox" v-show="$store.state.userStatus === 'manager'">
      <Dropdown @on-click="userClick">
        <span>管理员 </span>
        <a>
          <span> {{ name }} </span>
          <Icon type="ios-arrow-down" color="white" size="17"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="personInfo">个人信息</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <a>
        <Icon type="md-exit" color="white" size="17" />
        <span @click="loginOut">退出</span>
      </a>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getManagerInfo, changePwd } from "../../api/api";

export default {
  name: "Navigation",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.formPwd.pwdConfirm !== "") {
          this.$refs.formPwd.validateField("pwdConfirm");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.formPwd.pwdChanged) {
        callback(new Error("两次密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      name: "",
      modal: false,
      loading: true,
      formPwd: {
        pwd: "",
        pwdChanged: "",
        pwdConfirm: ""
      },
      ruleValidate: {
        pwd: [{ required: true, message: "密码不能为空", trigger: "blur" }],
        pwdChanged: [
          { validator: validatePass, trigger: "blur", required: true },
          { type: "string", min: 6, message: "密码至少为6位字符", trigger: "blur" }
        ],
        pwdConfirm: [{ validator: validatePassCheck, trigger: "blur", required: true}]
      }
    };
  },
  methods: {
    loginOut() {
      // alert("确定退出？");
      window.open("http://localhost:8090", "_self");
    },
    setName: async function() {
      if (this.$store.state.userStatus === "user") {
        this.name = (await getUserInfo(this.$store.state.userId)).data.name;
      } else {
        this.name = (await getManagerInfo(this.$store.state.userId)).data.name;
      }
    },
    userClick: function(name) {
      console.log(name);
      if (name === "personInfo") {
        this.$router.push("/personInfo");
      } else {
        this.modal = true;
      }
    },
    async confirm() {
      const flag = (await changePwd(this.$store.state.userId, this.formPwd)).data;
      if (flag.res === 0) {
        this.$Notice.success({
          title: flag.msg,
          duration: 2
        });
        this.modal = false;
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
  },
  async mounted() {
    if (sessionStorage.getItem("setStatus")) {
      this.$store.commit("setStatus", sessionStorage.getItem("setStatus"));
    }
    if (sessionStorage.getItem("userId")) {
      this.$store.commit("setId", sessionStorage.getItem("userId"));
    }
    this.setName();
  }
};
</script>

<style scoped>
.navBox {
  height: 100%;
  background-color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

span {
  color: white;
  font-size: 0.95rem;
}

.infoBox {
  width: 13%;
  height: 100%;
  margin-right: 1.7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/*span:hover {*/
/*  color: lightgrey;*/
/*}*/
</style>
