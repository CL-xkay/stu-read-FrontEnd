<template>
  <div>
    <div v-if="$store.state.userStatus === 'user'">
      <Menu theme="light" width="auto" active-name="0" accordion>
        <MenuItem name="0" to="/bookSearching">
          <Icon type="ios-paper-plane" />
          图书检索
        </MenuItem>
        <MenuItem name="1" to="borrowManagement">
          <Icon type="ios-bookmarks" />
          借阅管理
        </MenuItem>
        <Submenu name="2">
          <template slot="title">
            <Icon type="md-clock" />
            预约管理
          </template>
          <MenuItem name="2" to="/seatOrdering">在线预约</MenuItem>
          <MenuItem name="2-2" to="/myOrder">我的预约</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-stats" />
            数据统计
          </template>
          <MenuItem name="3-1" to="bookStatistics">借阅统计</MenuItem>
          <MenuItem name="3-2" to="orderStatistics">预约统计</MenuItem>
        </Submenu>
      </Menu>
    </div>
    <div v-else>
      <Menu theme="light" width="auto" active-name="0" accordion>
        <MenuItem name="0" to="userManagement">
          <Icon type="ios-people" />
          用户管理
        </MenuItem>
        <MenuItem name="1" to="bookManagement">
          <Icon type="md-bookmarks" />
          书籍管理
        </MenuItem>
        <MenuItem name="2" to="mBorrowManagement">
          <Icon type="md-swap" />
          借阅管理
        </MenuItem>
        <MenuItem name="3" to="Statistics">
          <Icon type="ios-stats" />
          数据统计
        </MenuItem>
      </Menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>
