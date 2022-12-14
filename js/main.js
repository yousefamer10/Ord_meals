$(document).ready(async () => {
    $(".overlayer").fadeOut(1000, () => {
        $(document.body).css("overflowY", "visible");
    })
    let api = "https://www.themealdb.com/api/json/v1/1/random.php";


    async function getRanndomMeal(api) {
        let response = await fetch(api);
        let myResponse = await response.json();
        return myResponse;
    }
    let myCurrentMeal = await getRanndomMeal(api);
    for (let i = 0; i < 10; i++) {
        let myCurrentMeal = await getRanndomMeal(api);
        let mealid = myCurrentMeal.meals[0].idMeal;
        let mealName = myCurrentMeal.meals[0].strMeal;
        let maelImg = myCurrentMeal.meals[0].strMealThumb;
        $("#1").append(`<div class="col-lg-3  col-sm-6 shadow ">
        <div class="items rounded-3 overflow-hidden">
            <div value= ${mealName} class="layer focus-img d-flex   align-items-center justify-content-center text-black">
                <h3>${mealName}<h3/>
            </div>
            <img src="${maelImg}" class="w-100 " alt="">
        </div>
    </div>`)
    }


    let width = $(".side-content").outerWidth();
    $(".side-strip").click(() => {

        if ($(".side-bar").css("left") == "0px") {
            $(".side-bar").animate({ "left": "240px" }, 500);
            $(".side-content").animate({ "left": `0px` }, 500);
            $(".side-strip").html(`<i class="fa-solid fa-xmark fa-2x"></i>`);
            $(".item").animate({ "opacity": "1" }, 500);
            $(".item").animate({ "paddingTop": "25px" }, 900);
        }
        else {
            $(".side-bar").animate({ "left": "0px" }, 500);
            $(".side-content").animate({ "left": `-${width}px` }, 500);
            $(".side-strip").html(`<i class="fa fa-align-justify fa-2x"></i>`);
            $(".item").animate({ "opacity": "0" }, 1000);
            $(".item").animate({ "paddingTop": "500px" }, 500);
        }
    })

    function closedives() {
        $(".side-bar").animate({ "left": "0px" }, 500);
        $(".side-content").animate({ "left": `-${width}px` }, 500);
        $(".side-strip").html(`<i class="fa fa-align-justify fa-2x"></i>`);
    }







    // ######################################################3




    $("#search").click(() => {
        $(".my-content1").css("display", "none");
        $(".search-bage").css("display", "block");
        $(".catigories-page").css("display", "none");
        $(".area-page").css("display", "none");
        $(".catigories-page2").css("display", "none");
        $(".Ingredients-page").css("display", "none");
        $(".contact-bage").css("display", "none");
        $(".details-of-meals").css("display", "none");
        $(".relatedToArae").css("display", "none");
        $(".areaMealsDetails").css("display", "none");
        $(".Ingredients-related").css("display", "none");
        $(".ingrediantMealsDetails").css("display", "none");
        $(".search-result").css("display", "none");
        $(".detailsOfCatigoriesItem").css("display", "none");
        $(".detailsOfsearchItem").css("display", "none");

        closedives();
        document.querySelector(".inp22").addEventListener("keyup", async function () {
            $(".overlayer").fadeIn(100)
            $(".overlayer").fadeOut(100, () => {
                $(document.body).css("overflowY", "visible");
            })
            let myLetter = this.value;
            if (testLetterValidation2(myLetter) == true) {
                let Api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${myLetter}`;
                let myResponse = await getapi(Api);
                let result = myResponse.meals;
                $(".search-result").css("display", "block");
                $(".detailsOfsearchItem").css("display", "none");
                $(".detailsOfCatigoriesItem").css("display", "none");
                $("#searchmeals").empty();
                for (let i = 0; i < result.length; i++) {
                    let mealName1 = result[i].strMeal;
                    let mealid = result[i].idMeal;
                    // console.log(mealName1);
                    let maelImg1 = result[i].strMealThumb;
                    $("#searchmeals").append(`<div class="col-md-3 col-lg-3 col-sm-6 shadow ">
                    <div class="items rounded-3 overflow-hidden">
                        <div value= "${mealid}" class="layer imgSearchDetails d-flex   align-items-center justify-content-center text-black">
                            <h3>${mealName1}<h3/>
                        </div>
                        <img src="${maelImg1}" class="w-100 " alt="">
                    </div>
                </div>`)
                }
                $(".imgSearchDetails").click(async function () {
                    $(".overlayer").fadeIn(100)
                    $(".overlayer").fadeOut(100, () => {
                        $(document.body).css("overflowY", "visible");
                    })
                    let my_attr_name = $(this).attr("value");
                    // console.log(my_attr_name);
                    let mtApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${my_attr_name}`
                    let myResponse = await getapi(mtApi);
                    let result = myResponse.meals;
                    // console.log(result);
                    $(".search-result").css("display", "none");
                    // $(".search-bage").css("display", "none");
                    $(".detailsOfsearchItem").css("display", "block");
                    let currentSource = $(this).next().attr("src");
                    $(".maels-imges h2").html(result[0].strMeal);
                    $(".maels-imges img").attr("src", currentSource);
                    let myobject = myResponse.meals[0];
                    // console.log(myobject);
                    let map = Object.entries(myobject);
                    // console.log(map);
                    let nextToRecipes = map.slice(9, 29);
                    let my_recipes = map.slice(29, 49);
                    $(".spn2").html(myobject.strCategory);
                    $(".spn6").html(myobject.strTags);
                    $(".inp1").attr("href", myobject.strSource);
                    $(".inp2").attr("href", myobject.strYoutube);
                    $(".meal-gradients p").html(myResponse.meals[0].strInstructions);
                    $(".meal-gradients .spn").html(myResponse.meals[0].strArea);
                    for (let i = 0; i < my_recipes.length; i++) {
                        if (my_recipes[i][1] != "" && my_recipes[i][1] != " " && nextToRecipes[i][1] != "" && nextToRecipes[i][1] != " ") {
                            // console.log(my_recipes[i][1]);
                            $(".row1 ul ").append(`<li class="p-1 mx-1 my-2 rounded-1 style">${my_recipes[i][1]} ${nextToRecipes[i][1]}</li>
                        </ul>`)
                        }
                    }
                })
            }

        })

        document.querySelector(".inp11").addEventListener("keyup", async function () {
            $(".overlayer").fadeIn(100)
            $(".overlayer").fadeOut(100, () => {
                $(document.body).css("overflowY", "visible");
            })
            let myLetter = this.value;
            if (myLetter.length == 1 && testLetterValidation(myLetter) == true) {
                let Api = `https://www.themealdb.com/api/json/v1/1/search.php?f=${myLetter}`;
                let myResponse = await getapi(Api);
                let result = myResponse.meals;
                $(".search-result").css("display", "block");
                $(".detailsOfsearchItem").css("display", "none");
                $(".detailsOfCatigoriesItem").css("display", "none");
                $("#searchmeals").empty();
                for (let i = 0; i < result.length; i++) {
                    let mealName1 = result[i].strMeal;
                    let mealid = result[i].idMeal;
                    // console.log(mealName1);
                    let maelImg1 = result[i].strMealThumb;
                    $("#searchmeals").append(`<div class="col-lg-3  col-sm-6shadow ">
                    <div class="items rounded-3 overflow-hidden">
                        <div value= "${mealid}" class="layer imgSearchDetails d-flex   align-items-center justify-content-center text-black">
                            <h3>${mealName1}<h3/>
                        </div>
                        <img src="${maelImg1}" class="w-100 " alt="">
                    </div>
                </div>`)
                }
            }

            $(".imgSearchDetails").click(async function () {
                $(".overlayer").fadeIn(100)
                $(".overlayer").fadeOut(100, () => {
                    $(document.body).css("overflowY", "visible");
                })
                let my_attr_name = $(this).attr("value");
                // console.log(my_attr_name);
                let mtApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${my_attr_name}`
                let myResponse = await getapi(mtApi);
                let result = myResponse.meals;
                // console.log(result);
                $(".search-result").css("display", "none");
                // $(".search-bage").css("display", "none");
                $(".detailsOfsearchItem").css("display", "block");

                let currentSource = $(this).next().attr("src");
                $(".maels-imges h2").html(result[0].strMeal);
                $(".maels-imges img").attr("src", currentSource);
                let myobject = myResponse.meals[0];
                // console.log(myobject);
                let map = Object.entries(myobject);
                // console.log(map);
                let nextToRecipes = map.slice(9, 29);
                let my_recipes = map.slice(29, 49);
                $(".spn2").html(myobject.strCategory);
                $(".spn6").html(myobject.strTags);
                $(".inp1").attr("href", myobject.strSource);
                $(".inp2").attr("href", myobject.strYoutube);
                $(".meal-gradients p").html(myResponse.meals[0].strInstructions);
                $(".meal-gradients .spn").html(myResponse.meals[0].strArea);
                for (let i = 0; i < my_recipes.length; i++) {
                    if (my_recipes[i][1] != "" && my_recipes[i][1] != " " && nextToRecipes[i][1] != "" && nextToRecipes[i][1] != " ") {
                        // console.log(my_recipes[i][1]);
                        $(".row1 ul ").append(`<li class="p-1 mx-1 my-2 rounded-1 style">${my_recipes[i][1]} ${nextToRecipes[i][1]}</li>
                    </ul>`)
                    }
                }
            })
        })


    })
    // ####################################################################################33
    $("#Categories").click(async () => {
        $(".overlayer").fadeIn(100)
        $(".overlayer").fadeOut(100, () => {
            $(document.body).css("overflowY", "visible");
        })
        $(".my-content1").css("display", "none");
        $(".search-bage").css("display", "none");
        $(".catigories-page").css("display", "block");
        $(".Ingredients-page").css("display", "none");
        $(".area-page").css("display", "none");
        $(".catigories-page2").css("display", "none");
        $(".contact-bage").css("display", "none");
        $(".details-of-meals").css("display", "none");
        $(".areaMealsDetails").css("display", "none");
        $(".relatedToArae").css("display", "none");
        $(".Ingredients-related").css("display", "none");
        $(".ingrediantMealsDetails").css("display", "none");
        $(".search-result").css("display", "none");
        $(".detailsOfsearchItem").css("display", "none");

        let myApi = "https://www.themealdb.com/api/json/v1/1/categories.php";
        let myResponse3 = await getapi(myApi);
        let myresult = myResponse3.categories;
        $("#3").empty();
        for (let i = 0; i < myresult.length; i++) {
            let supString = myresult[i].strCategoryDescription.substring(0, 60);

            $("#3").append(`<div class="col-lg-3 col-sm-6 shadow ">
            <div class="items py-3  rounded-3  overflow-hidden">
                <div  id="thisdiv" value=${myresult[i].strCategory}  class="layer d-flex myCatigory align-items-center justify-content-center text-black">
                    <div class="inner">
                        <h3>${myresult[i].strCategory}</h3>
                        <p>${supString}</p>
                    </div>
                </div>
                <img src=${myresult[i].strCategoryThumb} class="w-100 " alt="">
            </div>
        </div>`)
        }
        closedives();
        $(".myCatigory").click(async function () {
            $(".overlayer").fadeIn(100)
            $(".overlayer").fadeOut(100, () => {
                $(document.body).css("overflowY", "visible");
            })
            let name = $(this).attr("value");
            // console.log(name);
            let mtApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
            let myResponse = await getapi(mtApi);
            let result = myResponse.meals;
            $(".catigories-page").css("display", "none");
            $(".catigories-page2").css("display", "block");
            // console.log(result);
            $("#4").empty()
            for (let i = 0; i < result.length; i++) {
                let mealName1 = result[i].strMeal;
                let mealid = result[i].idMeal;
                // console.log(mealName1);
                let maelImg1 = result[i].strMealThumb;
                $("#4").append(`<div class=" col-lg-3 col-sm-6 shadow ">
                <div class="items rounded-3 overflow-hidden">
                    <div value= "${mealid}" class="layer details d-flex   align-items-center justify-content-center text-black">
                        <h3>${mealName1}<h3/>
                    </div>
                    <img src="${maelImg1}" class="w-100 " alt="">
                </div>
            </div>`)
            }
            $(".details").click(async function () {
                $(".overlayer").fadeIn(100)
                $(".overlayer").fadeOut(100, () => {
                    $(document.body).css("overflowY", "visible");
                })
                let my_attr_name = $(this).attr("value");
                // console.log(my_attr_name);
                let mtApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${my_attr_name}`
                let myResponse = await getapi(mtApi);
                let result = myResponse.meals;
                // console.log(result);
                $(".catigories-page2").css("display", "none");
                $(".detailsOfCatigoriesItem").css("display", "block");
                let currentSource = $(this).next().attr("src");
                $(".maels-imges h2").html(result[0].strMeal);
                $(".maels-imges img").attr("src", currentSource);
                let myobject = myResponse.meals[0];
                // console.log(myobject);
                let map = Object.entries(myobject);
                // console.log(map);
                let nextToRecipes = map.slice(9, 29);
                let my_recipes = map.slice(29, 49);
                $(".spn2").html(myobject.strCategory);
                $(".spn6").html(myobject.strTags);
                $(".inp1").attr("href", myobject.strSource);
                $(".inp2").attr("href", myobject.strYoutube);
                $(".meal-gradients p").html(myResponse.meals[0].strInstructions);
                $(".meal-gradients .spn").html(myResponse.meals[0].strArea);
                for (let i = 0; i < my_recipes.length; i++) {
                    if (my_recipes[i][1] != "" && my_recipes[i][1] != " " && nextToRecipes[i][1] != "" && nextToRecipes[i][1] != " ") {
                        // console.log(my_recipes[i][1]);
                        $(".row1 ul ").append(`<li class="p-1 mx-1 my-2 rounded-1 style">${my_recipes[i][1]} ${nextToRecipes[i][1]}</li>
                    </ul>`)
                    }
                }
            })
        })

        // ##############################################################################3#######################3
    })
    $("#Area").click(async () => {
        $(".overlayer").fadeIn(100)
        $(".overlayer").fadeOut(100, () => {
            $(document.body).css("overflowY", "visible");
        })
        $(".my-content1").css("display", "none");
        $(".search-bage").css("display", "none");
        $(".catigories-page").css("display", "none");
        $(".catigories-page2").css("display", "none");
        $(".area-page").css("display", "block");
        $(".Ingredients-page").css("display", "none");
        $(".contact-bage").css("display", "none");
        $(".details-of-meals").css("display", "none");
        $(".detailsOfCatigoriesItem").css("display", "none");
        $(".relatedToArae").css("display", "none");
        $(".areaMealsDetails").css("display", "none");
        $(".Ingredients-related").css("display", "none");
        $(".ingrediantMealsDetails").css("display", "none");
        $(".search-result").css("display", "none");
        $(".detailsOfsearchItem").css("display", "none");

        let myApi = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
        let myResponse3 = await getapi(myApi);
        // console.log(myResponse3);
        let myresult = myResponse3.meals;
        for (let i = 0; i < myresult.length; i++) {
            $("#areas").append(`<div class="col-lg-3 col-sm-6 shadow">
        <div class="inner">
            <div value="${myresult[i].strArea}" class="inner-content areacontent text-center"> <i class="fa-solid fa-city fa-3x"></i>
                <h3 class="text-white">${myresult[i].strArea}</h3>
            </div>
        </div>
     </div>`
            )
        }

        closedives();
        $(".areacontent").click(async function () {
            $(".overlayer").fadeIn(100)
            $(".overlayer").fadeOut(100, () => {
                $(document.body).css("overflowY", "visible");
            })
            let areaName = $(this).attr("value");
            // console.log(areaName);
            let Api = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
            let myResponse = await getapi(Api);
            // console.log(myResponse);
            let result = myResponse.meals;
            $(".area-page").css("display", "none");
            $(".relatedToArae").css("display", "block");
            $("#areameals").empty();
            for (let i = 0; i < result.length; i++) {
                let mealName1 = result[i].strMeal;
                let mealid = result[i].idMeal;
                let maelImg1 = result[i].strMealThumb;
                $("#areameals").append(`<div class=" col-lg-3  col-sm-6 shadow ">
                    <div class="items rounded-3 overflow-hidden">
                        <div value= "${mealid}" class="layer  d-flex  areaMealDeatail  align-items-center justify-content-center text-black">
                            <h3>${mealName1}<h3/>
                        </div>
                        <img src="${maelImg1}" class="w-100 " alt="">
                    </div>
                </div>`)
            }




            $(".areaMealDeatail").click(async function () {
                $(".overlayer").fadeIn(100)
                $(".overlayer").fadeOut(100, () => {
                    $(document.body).css("overflowY", "visible");
                })
                let my_attr_name = $(this).attr("value");
                // console.log(my_attr_name);
                let mtApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${my_attr_name}`
                let myResponse = await getapi(mtApi);
                let result = myResponse.meals;
                // console.log(result);
                $(".relatedToArae").css("display", "none");
                $(".areaMealsDetails").css("display", "block");
                let currentSource = $(this).next().attr("src");
                $(".maels-imges h2").html(result[0].strMeal);
                $(".maels-imges img").attr("src", currentSource);
                let myobject = myResponse.meals[0];
                // console.log(myobject);
                let map = Object.entries(myobject);
                // console.log(map);
                let nextToRecipes = map.slice(9, 29);
                let my_recipes = map.slice(29, 49);
                $(".spn2").html(myobject.strCategory);
                $(".spn6").html(myobject.strTags);
                $(".inp1").attr("href", myobject.strSource);
                $(".inp2").attr("href", myobject.strYoutube);
                $(".meal-gradients p").html(myResponse.meals[0].strInstructions);
                $(".meal-gradients .spn").html(myResponse.meals[0].strArea);
                for (let i = 0; i < my_recipes.length; i++) {
                    if (my_recipes[i][1] != "" && my_recipes[i][1] != " " && nextToRecipes[i][1] != "" && nextToRecipes[i][1] != " ") {
                        // console.log(my_recipes[i][1]);
                        $(".row1 ul ").append(`<li class="p-1 mx-1 my-2 rounded-1 style">${my_recipes[i][1]} ${nextToRecipes[i][1]}</li>
                    </ul>`)
                    }
                }
            })

        })


    })
    //    #################################################################










    $("#Ingredients").click(async () => {
        $(".overlayer").fadeIn(100)
        $(".overlayer").fadeOut(100, () => {
            $(document.body).css("overflowY", "visible");
        })
        $(".my-content1").css("display", "none");
        $(".search-bage").css("display", "none");
        $(".catigories-page2").css("display", "none");
        $(".catigories-page").css("display", "none");
        $(".area-page").css("display", "none");
        $(".Ingredients-page").css("display", "block");
        $(".contact-bage").css("display", "none");
        $(".details-of-meals").css("display", "none");
        $(".areaMealsDetails").css("display", "none");
        $(".Ingredients-related").css("display", "none");
        $(".ingrediantMealsDetails").css("display", "none");
        $(".detailsOfCatigoriesItem").css("display", "none");
        $(".search-result").css("display", "none");
        $(".detailsOfsearchItem").css("display", "none");
        closedives();



        let myApi = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
        let myResponse3 = await getapi(myApi);
        let myresult = myResponse3.meals;
        // console.log(myresult);
        for (let i = 0; i < myresult.length; i++) {
            let String = myresult[i].strDescription;
            //    console.log(String);
            $("#ingred").append(` <div class=" col-lg-3 col-sm-6 shadow">
              <div class="inner burger">
              <div value="${myresult[i].strIngredient}" class="inner-content  text-center">
                <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h3>${myresult[i].strIngredient}</h3>
                
            </div>
             </div></div>`)
        }

        $(".inner-content").click(async function () {
            $(".overlayer").fadeIn(100)
            $(".overlayer").fadeOut(100, () => {
                $(document.body).css("overflowY", "visible");
            })
            let my_attr_name = $(this).attr("value");
            // console.log(my_attr_name);
            let myApi = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${my_attr_name}`;
            let myResponse3 = await getapi(myApi);
            // console.log(myResponse3);
            let myresult = myResponse3.meals;
            // console.log(myresult);
            $(".Ingredients-page").css("display", "none");
            $(".Ingredients-related").css("display", "block");
            $("#ingrediant-meals").empty();
            if (myresult != null) {
                for (let i = 0; i < myresult.length; i++) {
                    let mealName1 = myresult[i].strMeal;
                    let mealid = myresult[i].idMeal;
                    let maelImg1 = myresult[i].strMealThumb;
                    $("#ingrediant-meals").append(`<div class=" col-lg-3 col-sm-6 shadow ">
                        <div class="items rounded-3 overflow-hidden">
                            <div value= "${mealid}" class="layer  d-flex  ingreMealDeatail  align-items-center justify-content-center text-black">
                                <h3>${mealName1}<h3/>
                            </div>
                            <img src="${maelImg1}" class="w-100 " alt="">
                        </div>
                    </div>`)
                }
            }
            $(".ingreMealDeatail").click(async function () {
                $(".overlayer").fadeIn(100)
                $(".overlayer").fadeOut(100, () => {
                    $(document.body).css("overflowY", "visible");
                })
                let my_attr_name = $(this).attr("value");
                // console.log(my_attr_name);
                let mtApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${my_attr_name}`
                let myResponse = await getapi(mtApi);
                let result = myResponse.meals;
                // console.log(result);
                $(".Ingredients-related").css("display", "none");
                $(".Ingredients-page").css("display", "none");
                $(".ingrediantMealsDetails").css("display", "block");
                let currentSource = $(this).next().attr("src");
                $(".maels-imges h2").html(result[0].strMeal);
                $(".maels-imges img").attr("src", currentSource);
                let myobject = myResponse.meals[0];
                // console.log(myobject);
                let map = Object.entries(myobject);
                // console.log(map);
                let nextToRecipes = map.slice(9, 29);
                let my_recipes = map.slice(29, 49);
                $(".spn2").html(myobject.strCategory);
                $(".spn6").html(myobject.strTags);
                $(".inp1").attr("href", myobject.strSource);
                $(".inp2").attr("href", myobject.strYoutube);
                $(".meal-gradients p").html(myResponse.meals[0].strInstructions);
                $(".meal-gradients .spn").html(myResponse.meals[0].strArea);
                for (let i = 0; i < my_recipes.length; i++) {
                    if (my_recipes[i][1] != "" && my_recipes[i][1] != " " && nextToRecipes[i][1] != "" && nextToRecipes[i][1] != " ") {
                        // console.log(my_recipes[i][1]);
                        $(".row1 ul ").append(`<li class="p-1 mx-1 my-2 rounded-1 style">${my_recipes[i][1]} ${nextToRecipes[i][1]}</li>
                    </ul>`)
                    }
                }
            })


        })

    })


    $("#ContactUs").click(() => {
        $(".overlayer").fadeIn(100)
        $(".overlayer").fadeOut(100, () => {
            $(document.body).css("overflowY", "visible");
        })
        // console.log("hello");
        $(".my-content1").css("display", "none");
        $(".search-bage").css("display", "none");
        $(".catigories-page").css("display", "none");
        $(".catigories-page2").css("display", "none");
        $(".area-page").css("display", "none");
        $(".Ingredients-page").css("display", "none");
        $(".contact-bage").css("display", "block");
        $(".details-of-meals").css("display", "none");
        $(".areaMealsDetails").css("display", "none");
        $(".Ingredients-related").css("display", "none");
        $(".ingrediantMealsDetails").css("display", "none");
        $(".detailsOfCatigoriesItem").css("display", "none");
        $(".search-result").css("display", "none");
        $(".detailsOfsearchItem").css("display", "none");

        closedives();
    })


    localStorage.clear();

    $(".myname");
    $(".myemail");
    $(".myphone");
    $(".myage");
    $(".mypassword");
    $(".myrepassword");
    $(".summit");
    $(".name-alert");
    $(".email-alert");
    $(".password");
    $(".age-alert");
    $(".phone-alert");
    $(".re-password");
    // borderBottom","1px solid rgb(217 5 5 / 70%)

    $(".myname").keyup(function () {
        let value = this.value;
        localStorage.setItem("name", JSON.stringify(value));

        let my_result = testLetterValidationOfName(value);
        if (my_result == true) {
            $(this).css("borderBottom", "1px solid green")
            $(".name22").html(`<i id="on" class="fa-solid fa-hand-peace"></i>`);
            $("#on").css("color", "green");
        } else {
            $("#on").css("color", "transparent");
            $(this).css("borderBottom", "1px solid rgb(217 5 5 / 70%)")
        }
        test();
    })
    $(".myemail").keyup(function () {
        let value = this.value;
        localStorage.setItem("mail", JSON.stringify(value));
        let my_result = testLetterValidationOfEmail(value);
        if (my_result == true) {
            $(this).css("borderBottom", "1px solid green")
            $(".email").html(`<i id="to" class="fa-solid fa-hand-peace"></i>`);
            $("#to").css("color", "green");
        } else {
            $("#to").css("color", "transparent");
            $(this).css("borderBottom", "1px solid rgb(217 5 5 / 70%)")
        }
        test();

    })
    $(".myphone").keyup(function () {
        let value = this.value;
        localStorage.setItem("phone", JSON.stringify(value));
        let my_result = testLetterValidationOfphone(value);
        if (my_result == true) {
            $(this).css("borderBottom", "1px solid green")
            $(".phone").html(`<i id="thre" class="fa-solid fa-hand-peace"></i>`);
            $("#thre").css("color", "green");
        } else {
            $("#thre").css("color", "transparent");
            $(this).css("borderBottom", "1px solid rgb(217 5 5 / 70%)")
        }
        test();
    })
    $(".myage").keyup(function () {
        let value = this.value;
        localStorage.setItem("ages", JSON.stringify(value));
        if (value >= 18) {
            $(this).css("borderBottom", "1px solid green");
            // document.querySelector(".btnn").classList.remove("invisible")
            test();
        } else {
            $(this).css("borderBottom", "1px solid rgb(217 5 5 / 70%)");
            // test();
            document.querySelector(".btnn").classList.add("invisible");
        }
        
    })





    $(".my_password").keyup(function () {
        let value = this.value;
        localStorage.setItem("value", JSON.stringify(value));
        let my_result = testLetterValidationOfPassword(value);
        if (my_result == true) {
            $(this).css("borderBottom", "1px solid green")
            $(".fisrtpassword").html(`<i id="fou" class="fa-solid fa-hand-peace"></i>`);
            $("#fou").css("color", "green");
        } else {
            $("#fou").css("color", "transparent");
            $(this).css("borderBottom", "1px solid rgb(217 5 5 / 70%)")
        }
        test()
    })
    $(".myrepassword").keyup(function () {
        let thisvalue = this.value;
        localStorage.setItem("repassvalue", JSON.stringify(thisvalue));
        let result = testLetterValidationOfrePassword(thisvalue)
        if (thisvalue == JSON.parse(localStorage.getItem("value")) && result == true) {
            $(this).css("borderBottom", "1px solid green")
            $(".repassword").html(`<i id="fiv" class="fa-solid fa-hand-peace"></i>`);
            $("#fiv").css("color", "green");
        } else {
            $("#fiv").css("color", "transparent");
            $(this).css("borderBottom", "1px solid rgb(217 5 5 / 70%)")
        }
        test();
    })




    // اهم جزء############################## ج#################
    async function getapi(api) {
        let response = await fetch(api);
        let myResponse = await response.json();
        return myResponse;
    }
    $(".focus-img").click(async function () {
        $(".overlayer").fadeIn(100)
        $(".overlayer").fadeOut(100, () => {
            $(document.body).css("overflowY", "visible");
        })
        let currentSource = $(this).next().attr("src");
        let name = $(this).attr("value")
        // console.log(name);
        let api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
        $(".my-content1").css("display", "none");
        $(".details-of-meals").css("display", "block");
        $(".maels-imges img").attr("src", currentSource);
        $(".maels-imges h2").html(name);

        let myResponse = await getapi(api);
        // console.log(myResponse);
        let myobject = myResponse.meals[0];
        let map = Object.entries(myobject);
        // console.log(map);
        let nextToRecipes = map.slice(9, 29);
        let my_recipes = map.slice(29, 49);
        $(".spn2").html(myobject.strCategory);
        $(".spn6").html(myobject.strTags);
        $(".inp1").attr("href", myobject.strSource);
        $(".inp2").attr("href", myobject.strYoutube);
        $(".meal-gradients p").html(myResponse.meals[0].strInstructions);
        $(".meal-gradients .spn").html(myResponse.meals[0].strArea);
        for (let i = 0; i < my_recipes.length; i++) {
            if (my_recipes[i][1] != "" && my_recipes[i][1] != " " && nextToRecipes[i][1] != "" && nextToRecipes[i][1] != " ") {
                // console.log(my_recipes[i][1]);
                $(".row1 ul ").append(`<li class="p-1 mx-1 my-2 rounded-1 style">${my_recipes[i][1]} ${nextToRecipes[i][1]}</li>
            </ul>`)
            }
        }
    })




    function testLetterValidation(value) {
        let val = /[a-z]{1}/gmi;
        return val.test(value);
    }
    function testLetterValidation2(value) {
        let val = /[a-z]{3,}/gmi;
        return val.test(value);
    }
    function testLetterValidationOfName(value) {
        let val = /[a-z]{3,}/gmi;
        return val.test(value);
    }
    function testLetterValidationOfEmail(value) {
        let val = /[a-z]{1,7}[0-9]{1,}(@gmail)(.com)$/gmi
        return val.test(value);
    }
    function testLetterValidationOfphone(value) {
        let val = /^01[0125][0-9]{8}$/gmi;
        return val.test(value);
    }
    function testLetterValidationOfPassword(value) {
        let val = /[0-9]{1,}/gmi
        return val.test(value);
    }
    function testLetterValidationOfrePassword(value) {
        let val = /[0-9]{1,}/gmi
        return val.test(value);
    }

    function test() {
        if (testLetterValidationOfName(JSON.parse(localStorage.getItem("name"))) == true && testLetterValidationOfEmail(JSON.parse(localStorage.getItem("mail"))) == true && testLetterValidationOfphone(JSON.parse(localStorage.getItem("phone"))) == true && testLetterValidationOfPassword(JSON.parse(localStorage.getItem("value"))) == true && testLetterValidationOfPassword(JSON.parse(localStorage.getItem("value"))) == true && testLetterValidationOfrePassword(JSON.parse(localStorage.getItem("repassvalue"))) == true && JSON.parse(localStorage.getItem("value")) == JSON.parse(localStorage.getItem("repassvalue"))&& JSON.parse(localStorage.getItem("ages") ) ) {
            console.log("hello");
            document.querySelector(".btnn").classList.remove("invisible")

        }
        else {
            document.querySelector(".btnn").classList.add("invisible")
        }
    }

})
