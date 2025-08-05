let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let searchTitle = document.getElementById('searchTitle');
let searchCategory = document.getElementById('searchCategory');

let mode = 'create';
let tmp;

let dataProduct;
if (localStorage.product != null) {
    try {
        dataProduct = JSON.parse(localStorage.product);
    } catch (e) {
        console.error("خطأ في تحليل localStorage.product:", e);
        dataProduct = [];
    }
} else {
    dataProduct = [];
}

function getTotal() {
    if (price.value !== '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#18f998';
        total.style.color = '#000';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

submit.onclick = function () {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };

    if (title.value && price.value && category.value) {
        if (mode === 'create') {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push({ ...newProduct, count: 1 });
                }
            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[tmp] = newProduct;
            mode = 'create';
            submit.innerText = 'إنشاء';
            count.style.display = 'block';
        }
        localStorage.setItem('product', JSON.stringify(dataProduct));
        clearData();
        showData();
    } else {
        alert('يرجى ملء الحقول الأساسية: اسم المنتج، السعر، والتصنيف');
    }
};

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    search.value = '';
}

function showData() {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr> 
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
            <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (dataProduct.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">حذف الكل (${dataProduct.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
}

function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.setItem('product', JSON.stringify(dataProduct));
    showData();
}

function deleteAll() {
    if (confirm("هل أنت متأكد من حذف جميع المنتجات؟")) {
        localStorage.removeItem('product');
        dataProduct = [];
        showData();
    }
}

function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProduct[i].category;
    submit.innerText = 'تحديث';
    mode = 'update';
    tmp = i;
    scroll({ top: 0, behavior: 'smooth' });
}

searchTitle.onclick = function () {
    let searchValue = search.value.toLowerCase();
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        if (dataProduct[i].title.includes(searchValue)) {
            table += `
            <tr> 
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
                <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
            </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
};

searchCategory.onclick = function () {
    let searchValue = search.value.toLowerCase();
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        if (dataProduct[i].category.includes(searchValue)) {
            table += `
            <tr> 
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">تحديث</button></td>
                <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
            </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
};

showData();