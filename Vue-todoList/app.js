
//存取localstorage中的数据
var store = {
	save(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},
	fetch(key) {
		return JSON.parse(localStorage.getItem(key)) || []
	}
};

//取出所有的值
// var list = store.fetch("Peri He");
//过滤的时候有三种情况，all,finished,unfinished
var list = []
var filter = {
	all: function (list) {
		return list;
	},
	unfinished: function () {
		return list.filter(function (item) {
			return !item.state;
		})
	},
	finished: function () {
		return list.filter(function (item) {
			return item.state;
		})
	}
}

var vm = new Vue({
	el: ".main",
	data: {
		list: [],
		title: '',
		remark: '',
		editorTodos: '',//记录正在编辑的数据
		beforeRemark: '',//记录正在编辑的数据的title
		visibility: "all" //通过这个值的变化对数据进行筛选
	},
	watch: {  //监控list这个属性，当这个属性对应的值发生改变时执行函数
		// list:function(){
		// 	store.save("Peri He",this.list);
		// }

		list: {   //深度监控！
			handler: function () {
				store.save("Peri He", this.list);
				list = this.list
			},
			deep: true
		}
	},
	computed: {
		nocheckLength: function () {
			return this.list.filter(function (item) {
				return !item.state;
			}).length
		},
		filteredList: function () {
			//找到了过滤函数就返回过滤后的数据，没有就返回所有数据
			return filter[this.visibility] ? filter[this.visibility](list) : list;
		}
	},
	mounted() {
		this.getTasks()
	},
	methods: {
		//添加任务
		addTodo(ev) { //函数简写的方式，es6
			if (!this.title || !this.remark) {
				alert("title or remark is empty!")
				return
			}
			let todo = {
				title: this.title,
				remark: this.remark,
			}
			this.addTask(todo, (id) => {
				this.list.unshift({  //事件处理函数中的this指向的是当前这个根实例
					...todo,
					id,
					state: false
				});
				this.title = ''; //添加成功后清空输入框
				this.remark = ''; //添加成功后清空输入框
			})

		},
		//删除任务
		deleteTodo(todo) {
			this.deleteTask({id:todo.id},()=>{
				var index = this.list.findIndex(item => item.id === todo.id);
				this.list.splice(index, 1);
			})
		},
		//编辑任务
		editorTodo(todo) {
			//编辑任务的时候记录一下这条任务的title,方便在取消编辑的时候重新复制回来
			this.beforeRemark = todo.remark;
			this.editorTodos = todo;
		},
		//编辑完成
		editorTodoed(todo) {
			let task = {
				where: { id: todo.id },
				set: { remark: todo.remark }
			}
			this.editTask(task, () => {
				this.editorTodos = "";
			})
		},
		//取消编辑
		cancelTodo(todo) {
			todo.remark = this.beforeRemark;
			this.beforeRemark = '';
			//让div显示，input隐藏
			this.editorTodos = '';
		},

		toggleState(todo){
			let task = {
				where: { id: todo.id },
				set: { state: !todo.state }
			}
			let url='http://127.0.0.1:3013/api/task/'
			url+=(todo.state?"unFinish":"finish")
			this.changTaskState(task,url ,() => {
				todo.state=!todo.state
			})
		},
		getTasks(filter) {
			let _this = this
			Ajax.init({
				type: "post",  //请求方式 POST or GET(默认)    
				url: "http://localhost:3013/api/task/getTask",   //请求的地址    
				async: true,  //是否异步，默认true    
				timeout: 5000,  //超时处理，默认10000    
				data: filter,  //发送的数据，json格式    
				dataType: "json",   //返回数据的格式，有text/xml/json三种，默认text  
				success: function (res) {
					//成功回调函数       
					_this.list = res.data
					console.log(res)
				},
				error: function (err) {
					//失败回调函数       
					console.log(err)
				}
			})
		},
		addTask(todo, cb) {
			let _this = this
			Ajax.init({
				type: "post",  //请求方式 POST or GET(默认)    
				url: "http://localhost:3013/api/task/add",   //请求的地址    
				async: true,  //是否异步，默认true    
				timeout: 5000,  //超时处理，默认10000    
				data: todo,  //发送的数据，json格式    
				dataType: "json",   //返回数据的格式，有text/xml/json三种，默认text  
				success: function (res) {
					//成功回调函数       
					cb(res.data)
					console.log(res)
				},
				error: function (err) {
					//失败回调函数       
					console.log(err)
				}
			})
		},
		editTask(todo, cb) {
			Ajax.init({
				type: "post",  //请求方式 POST or GET(默认)    
				url: "http://localhost:3013/api/task/modifyContent",   //请求的地址    
				async: true,  //是否异步，默认true    
				timeout: 5000,  //超时处理，默认10000    
				data: todo,  //发送的数据，json格式    
				content_type: 'json',
				dataType: "json",   //返回数据的格式，有text/xml/json三种，默认text  
				success: function (res) {
					//成功回调函数       
					cb()
					console.log(res)
				},
				error: function (err) {
					//失败回调函数       
					console.log(err)
				}
			})
		},
		deleteTask(todo,cb){
			Ajax.init({
				type: "get",  //请求方式 POST or GET(默认)    
				url: "http://localhost:3013/api/task/delete",   //请求的地址    
				async: true,  //是否异步，默认true    
				timeout: 5000,  //超时处理，默认10000    
				data: todo,  //发送的数据，json格式    
				dataType: "json",   //返回数据的格式，有text/xml/json三种，默认text  
				success: function (res) {
					//成功回调函数       
					cb()
					console.log(res)
				},
				error: function (err) {
					//失败回调函数       
					console.log(err)
				}
			})
		},
		changTaskState(todo,url,cb){
			Ajax.init({
				type: "post",  //请求方式 POST or GET(默认)    
				url: url,   //请求的地址    
				async: true,  //是否异步，默认true    
				timeout: 5000,  //超时处理，默认10000   
				content_type: 'json',
				data: todo,  //发送的数据，json格式    
				dataType: "json",   //返回数据的格式，有text/xml/json三种，默认text  
				success: function (res) {
					//成功回调函数       
					cb()
					console.log(res)
				},
				error: function (err) {
					//失败回调函数       
					console.log(err)
				}
			})
		}

	},
	directives: {
		"focus": {
			update(el, binding) {
				if (binding.value) {
					el.focus();
				}
			}
		}
	}
});

function watchHashChange() {
	var hash = window.location.hash.slice(1);
	vm.visibility = hash;
}
watchHashChange();
window.addEventListener("hashchange", watchHashChange);