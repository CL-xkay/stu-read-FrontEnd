<template>
  <div class="homeBox">
    <navigation class="navBox"></navigation>
    <div class="mainBox">
      <sidebar class="sideBox"></sidebar>
      <router-view class="contentBox" />
    </div>
  </div>
</template>

<script>
import navigation from "../components/common/Navigation";
import sidebar from "../components/common/Sidebar";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    navigation,
    sidebar
  }
};
</script>

<style scoped lang="less">
.homeBox {
  height: 100%;
  width: 100%;
}

.navBox {
  height: 11%;
}

.mainBox {
  margin: 5% 10%;
  width: 80%;
  min-height: 66%;
  background-color: white;
  display: flex;
}

.sideBox {
  width: 30%;
  padding: 3% 0;
}

.contentBox {
  margin: 3%;
  width: 100%;
}
</style>
