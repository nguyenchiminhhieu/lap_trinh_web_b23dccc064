//Bài tập 1: Thay đổi nội dung của một phần tử//
document.getElementById("title").innerText = "Hello, DOM!";


//Bài tập 2: Thay đổi màu sắc của phần tử//
document.getElementById("text").style.color = "red";


//Bài tập 3: Thêm phần tử mới vào DOM//
var newItem = document.createElement("li");
newItem.innerText = "New item";
document.getElementById("list").appendChild(newItem);

//Bài tập 4: Xóa phần tử khỏi DOM//
var elementToRemove = document.getElementById("remove-me");
elementToRemove.parentNode.removeChild(elementToRemove);

//Bài tập 5: Thay đổi thuộc tính của phần tử//
document.getElementById("image").src = "new-image-url.jpg";


// Bài tập 6: Xử lý sự kiện click//
document.getElementById("btn").addEventListener("click", function() {
    alert("Button clicked!");
});


// Bài tập 7: Thay đổi nội dung của nhiều phần tử//
var paragraphs = document.getElementsByTagName("p");
for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].innerText = "Updated paragraph";
}

// Bài tập 8: Tạo một bảng động//
var table = document.createElement("table");

for (var i = 0; i < 3; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 3; j++) {
        var cell = document.createElement("td");
        cell.innerText = "Cell " + (i+1) + "-" + (j+1);
        row.appendChild(cell);
    }
    table.appendChild(row);
}

document.getElementById("table-container").appendChild(table);

// Bài tập 9: Đếm số lượng phần tử trong DOM//
var divCount = document.getElementsByTagName("div").length;
console.log("Number of <div> elements: " + divCount);

// Bài tập 10: Thay đổi nội dung bằng cách thao tác với Class//
var items = document.getElementsByClassName("item");
for (var i = 0; i < items.length; i++) {
    items[i].innerText = "Updated item";
}
