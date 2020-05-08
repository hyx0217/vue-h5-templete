import service from '../utils/request.js'
console.log(service)
const user = {
  getTopic:function(){
    return service({
      url: '/getTopic',
      method: 'post'
    })
  },
  test2: function() {
    console.log(2)
  },
}
export default { user }
