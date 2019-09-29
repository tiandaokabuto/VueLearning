/**
 * 使用localStorage存储数据的工具模块
 * 1.函数（对外暴露一个功能）
 * 2.对象（对外暴露多个功能）
 */
export default {
  saveComments(comments) {
    window.localStorage.setItem('comments_key', JSON.stringify(comments))
  },
  readComments() {
    return JSON.parse(window.localStorage.getItem('comments_key') || '[]')
  }
}
