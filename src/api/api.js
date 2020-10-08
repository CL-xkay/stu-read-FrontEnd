import axios from "axios";

//普通用户:
export function userLogin(user, status) {
  return axios.post("/api/v1/enter", {
    id: user.id,
    pwd: user.pwd,
    status: status
  });
}

export function getAreas() {
  return axios.get("/api/v1/appointment");
}

export function getSeats(data) {
  return axios.get(`/api/v1/appointment/area?floor=${data[0]}&area=${data[1]}`);
}

export function getTime(data, seat) {
  return axios.get(
    `/api/v1/appointment/time?floor=${data[0]}&area=${data[1]}&seat=${seat}`
  );
}

export function orderSeat(data) {
  return axios.post("/api/v1/appointment/seat", data);
}

export function getOrders(id) {
  return axios.get(`/api/v1/appointment/id?id=${id}`);
}

export function deleteOrder(data) {
  return axios.delete("/api/v1/delete/appointment", { data: data});
}

export function timesStatistic(id) {
  return axios.get(`/api/v1/num/statistic?id=${id}`);
}

export function orderTimeStatistic(id) {
  return axios.get(`/api/v1/time/statistic?id=${id}`);
}

export function searchBook(type, bookValue) {
  return axios.post("/api/v1/search/book", {
    type: type,
    value: bookValue
  });
}

export function bookBorrow(userId, bookId) {
  return axios.post("/api/v1/borrow",{
    cid: userId,
    bid: bookId
  });
}

export function listBorrowed(id) {
  return axios.get("/api/v1/list_borrowed_book",{
    params: {
      cid: id
    }
  });
}

export function returnBook(userId, bookId) {
  return axios.post("/api/v1/return_book", {
    cid: userId,
    bid: bookId
  });
}

export function listReturned(id) {
  return axios.get("/api/v1/list_returned_book",{
    params: {
      cid: id
    }
  });
}

export function categoryStatistic(id) {
  return axios.get("/api/v1/client/book/statistic",{
    params: {
      cid: id
    }
  });
}

export function timeStatistic(id) {
  return axios.get("/api/v1/client/book_num/statistic", {
    params: {
      cid: id
    }
  });
}

export function getUserInfo(id) {
  return axios.get("/api/v1/client", {
    params: {
      cid: id
    }
  });
}
export function getManagerInfo(id) {
  return axios.get("/api/v1/manager", {
    params: {
      mid: id
    }
  });
}

export function changePwd(id, formPwd) {
  return axios.post("/api/v1/client/change_pwd",{
    id: id,
    oldPwd: formPwd.pwd,
    newPwd: formPwd.pwdChanged,
    pwdConfirm: formPwd.pwdConfirm
  });
}

export function changeTel(id, Tel) {
  return axios.post("/api/v1/client/change_tel", {
    id: id,
    newTel: Tel
  });
}

export function changeEmail(id, Tel) {
  return axios.post("/api/v1/client/change_email", {
    id: id,
    newEmail: Tel
  });
}

export function getTotalUsers() {
  return axios.get("/api/v1/all/client");
}

export function addUser(formUser) {
  return axios.post("/api/v1/add/client", {
    CID: formUser.CID,
    CNAME: formUser.CNAME,
    CSEX: formUser.CSEX,
    CAGE: formUser.CAGE,
    CTEL: formUser.CTEL,
    CEMAIL: formUser.CEMAIL
  })
}
export function getTotalbook() {
  return axios.get("/api/v1/get/all_book");
}

export function editBookNum(id, num) {
  return axios.post("/api/v1/change/book_num",{
    BID: id,
    BNUM: num
  });
}

export function addBook(formBook) {
  return axios.post("/api/v1/add_book", {
    BID: formBook.id,
    BISBN: formBook.isbn,
    BNAME: formBook.name,
    BAUTHOR: formBook.author,
    BPRESS: formBook.press,
    BPRYM: formBook.prym,
    BNUM: formBook.num
  });
}

export function mListBorrowed() {
  return axios.get("/api/v1/book/in_return_time")
}

export function mListOverTime() {
  return axios.get("/api/v1/book/beyond_return_time")
}

export function mReturnBook(cid, bid) {
  return axios.post("/api/v1/manager/return_book", {
    cid: cid,
    bid: bid
  });
}

export function userStatistic() {
  return axios.get("/api/v1/client/statistic");
}

export function userBookStatistic() {
  return axios.get("/api/v1/client_borrow/statistic");
}