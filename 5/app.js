var organizeByTags = function (toDoObjects) {
	// создание пустого массива для тегов
	var tags = [];
	// перебираем все задачи toDos
	toDoObjects.forEach(function (toDo) {
	// перебираем все теги для каждой задачи
		toDo.tags.forEach(function (tag) {
		// убеждаемся, что этого тега
		// еще нет в массиве
		if (tags.indexOf(tag) === -1) {
			tags.push(tag);
		}
		});
	});
console.log(tags);
};

var main = function (toDoObjects) {
	"use strict";
	// как main имеет доступ к списку задач!
	var toDos = toDoObjects.map(function (toDo) {
		// просто возвращаем описание этой задачи
		return toDo.description;
	});
	// сейчас весь старый код должен работать как раньше!
	$("document").ready( function(){
	$.getJSON("todos.json", function (toDoObjects) {
	// вызов функции main с аргументом в виде объекта toDoObjects 
		main(toDoObjects);
	});

	$("document").ready( function(){

	$(".tabs a span").toArray().forEach(function (element) { 
	// создаем обработчик щелчков для этого элемента 
		$(element).on("click", function () {
			// поскольку мы используем версию элемента jQuery,
			// нужно создать временную переменную,
			// чтобы избежать постоянного обновления
			var $element = $(element);
			$(".tabs a span").removeClass("active"); 
			$(element).addClass("active");
			$("main .content").empty();

			if ($element.parent().is(":nth-child(1)")) { 
				for (var i = toDos.length-1; i > -1; i--) { 
					$(".content").append($("<li>").text(toDos[i]));
				}
			} 
			else if ($element.parent().is(":nth-child(2)")) { 
				toDos.forEach(function (todo) { 
					$(".content").append($("<li>").text(todo));
				});
			}
			else if ($element.parent().is(":nth-child(3)")) { 
					// ЭТО КОД ДЛЯ ВКЛАДКИ ТЕГИ 
					console.log("Щелчок на вкладке Теги");
					// organizeByTag(toDoObjects);
					var organizedByTag = organizeByTags(toDoObjects);
					
					 organizedByTag.forEach(function (tag) { 
						var $tagName = $("<h3>").text(tag.name), 
						$content = $("<ul>"); 
						tag.toDos.forEach(function (description) { 
							var $li = $("<li>").text(description); 
							$content.append($li);
						});
						$("main .content").append($tagName); 
						$("main .content").append($content);
					});

			}  
			else if ($element.parent().is(":nth-child(4)")) { 
				$(".content").append(
					'<input type="text" class="inp">'+
					'<button class="btn">Добавить</button>'
				);
				var newToDo;
				$('.btn').on('click',function(){
					newToDo= $('.inp').val();
					if (newToDo!='') {
						toDos.push( newToDo);
						alert('Новое задание "'+newToDo+'" успешно добавлено!');
						$('.inp').val("");
					}
				})
		
			}
			return false;
		})
	})


	$(".tabs a:first-child span").trigger("click");

})