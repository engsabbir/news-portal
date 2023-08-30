const loadNewsCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const categoryJson = await response.json();
    displayCategory(categoryJson.data.news_category);
}

const displayCategory = (categories) => {
    const newsCategoryContainer = document.getElementById('news-category-container');
    categories.forEach(category => {
        const { category_id, category_name } = category;
        // console.log(category_id);
        const a = document.createElement('a');
        a.innerHTML = `<a onclick="loadCategoryDetails('${category_id}')" class="tab">${category_name}</a>`;
        newsCategoryContainer.appendChild(a);
    })
}

const loadCategoryDetails = async (categoryId) => {
    // console.log(categoryId);
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    displayCategoryData(data.data);
}

const displayCategoryData = (categories) => {
    // console.log(categories);
    const allNewsContainer = document.getElementById('all-news-container');
    allNewsContainer.innerText = '';
    categories.forEach(singleNews => {
        const { thumbnail_url, title, details, total_view } = singleNews;
        const { img, name, published_date } = singleNews.author;
        const { badge, number } = singleNews.rating;
        console.log(singleNews);
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="flex flex-col md:flex-row gap-5 mb-3">
                <img src="${thumbnail_url}" class="p-5 md:p-0 w-2/4 mx-auto md:w-1/5">
                <div class="w-full md:w-4/5 relative">
                    <h1 class="text-3xl">${title}</h1>
                    <h3 class="text-md mt-5">${details.slice(0, 300)}  <span class="text-sm text-gray-400">...see more</span></h3>
                    <div class="flex justify-between items-center absolute w-full bottom-0">
                        <div>
                            <div class="">
                            </div>
                            <div>
                                <h2>Author Name: ${name || 'JIMI Berdy'}</h2>
                                <h2>Date: ${published_date}</h2>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <i class="fa-regular fa-eye"></i>
                            <h4>${total_view || 519}</h4>
                        </div>
                        <div>
                            <h2>Rating: ${number || 4.8}</h2>
                            <h2>Badge: ${badge || 'Medium'}</h2>
                        </div>
                        <div>
                            <button class="btn btn-success"><i class="fa-solid fa-arrow-right-long"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        allNewsContainer.appendChild(div);
    })
}
loadNewsCategory();