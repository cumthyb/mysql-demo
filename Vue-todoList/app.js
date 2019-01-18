
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
			this.addTask(todo, () => {
				this.list.unshift({  //事件处理函数中的this指向的是当前这个根实例
					...todo,
					state: false
				});
				this.title = ''; //添加成功后清空输入框
				this.remark = ''; //添加成功后清空输入框
			})

		},
		//删除任务
		deleteTodo(todo) {
			debugger
			var index = this.list.findIndex(item => item.id === todo.id);
			this.list.splice(index, 1);
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
					cb()
					console.log(res)
				},
				error: function (err) {
					//失败回调函数       
					console.log(err)
				}
			})
		},
		editTask(todo, cb) {
			/*
			let _this = this
			Ajax.init({
				type: "post",  //请求方式 POST or GET(默认)    
				url: "http://localhost:3013/api/task/modifyContent",   //请求的地址    
				async: true,  //是否异步，默认true    
				timeout: 5000,  //超时处理，默认10000    
				data: todo,  //发送的数据，json格式    
				content_type: 'application/json',
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
			*/

			var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			xhr.open('POST', 'http://localhost:3013/api/task/modifyContent');
			xhr.onreadystatechange = function () {

				if (xhr.readyState == 4) {
					if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
						cb()
					}

				}
			};
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
			xhr.send(todo);

		},
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