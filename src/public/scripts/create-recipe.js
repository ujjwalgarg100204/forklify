"use strict";
// TODO: Each tag has a cross button on top right corner, on clicking it
//         tag should be removed from the tag list

// recipe background image
$("input[name='image']").on("blur", function () {
	// on correct value put make the url the actual background
	$("#recipe-bg").css("background-image", `url('${$(this).val()}')`);

	// remove input from page
	$(this).hide();
});

// recipe card
// star on click behaviour
$("input[type='radio'][name='stars']").change(function () {
	const starNum = +$(this).val();
	$("input[name='stars']").each(function () {
		const currStarVal = +$(this).val();
		$(`label[for="star-${currStarVal}"] svg`).html(
			currStarVal <= starNum
				? '<path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />'
				: '<path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z" />'
		);
	});
});

/*$("input[name='timeNum']").blur(function () {
	const timeNum = +$(this).val();
	const timeUnit = $("select[name='timeUnit']").val();

	if (!timeUnit || isNaN(timeNum)) return;
	// remove old time-tag
	$("#time-tag").remove();

	if (timeUnit === "hours") {
		if (timeNum < 0.25)
			$("#tag-container").append(tagHTML("Under 15 minutes", "time-tag"));
		else if (timeNum < 0.5)
			$("#tag-container").append(tagHTML("Under 30 minutes", "time-tag"));
		else if (timeNum < 1)
			$("#tag-container").append(tagHTML("Under 60 minutes", "time-tag"));
	} else {
		if (timeNum < 15)
			$("#tag-container").append(tagHTML("Under 15 minutes", "time-tag"));
		else if (timeNum < 30)
			$("#tag-container").append(tagHTML("Under 30 minutes", "time-tag"));
		else if (timeNum < 60)
			$("#tag-container").append(tagHTML("Under 60 minutes", "time-tag"));
	}
});*/

// Tags
function tagHTML(text, id) {
	return `<div class="rounded-full bg-selected-mehandi text-white font-body relative grid place-content-center" id="${
		id ? id : ""
	}">
			<p class="capitalize px-3 py-2" data-tag="${text}">${text}</p>
			<button class="absolute -right-1 -top-1" type="button" onclick="(function (elem) { $(elem).parent('div').remove();})(this)">
				<div class="rounded-full bg-gray-900 p-2">
					<svg class="w-1.5 fill-white" 
						 xmlns="http://www.w3.org/2000/svg"
						 viewBox="0 0 384 512">
						<path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
					</svg>
				</div>
			</button>
    	</div>`;
}

$("#tags").keydown(function (ev) {
	if (ev.which !== 32) return;
	ev.preventDefault();

	const text = $(this).val();
	$("#tag-container").append(tagHTML(text));
	$(this).val("");
});

// ingredient
const servingsInp = $("input[name='servings']");
$("#inc-ingredient").click(() => servingsInp.val(+servingsInp.val() + 1));
$("#dec-ingredient").click(() =>
	servingsInp.val(+servingsInp.val() > 0 ? +servingsInp.val() - 1 : 0)
);
$("#add-ingredient").click(function () {
	$("#ingredient-container").append(`
		<li class="relative px-8 before:absolute before:w-4 before:h-4 before:rounded-full before:top-1/4 before:-left-0 before:bg-amber-600" data-ingredient>
            <label class="font-bold space-x-3">
                <input class="w-24 rounded-full ring-2 ring-amber-700 p-2 px-4" type="number" placeholder="1..3"
                       name="ingredientQuantityNum" />
                <input class="w-20 rounded-full ring-2 ring-amber-700 p-2 px-4" type="text" placeholder="g/tbsp"
                       name="ingredientQuantitySuffix" />
            </label> 
            <input class="ml-4 rounded-full ring-2 ring-amber-700 p-2 px-4" 
				   type="text"
				   placeholder="Ingredient name"
				   name="ingredientName" 
		    />
        </li>	
	`);
});

// direction or steps
$("#add-direction").click(function () {
	$("#direc-container").append(`
		<li style="counter-increment: li">
            <div class="space-y-2 flex flex-col">
                <label for="a" class="text-amber-600">Step <span
                            class="relative ml-3 before:content-[counter(li)] before:absolute before:inset-0 before:-translate-y-1 before:w-full before:h-full"></span></label>
                <textarea name="steps" class="rounded-lg ring-2 ring-amber-700 p-3"></textarea>
            </div>
        </li>
	`);
});

$('form[action="/r/create"]').submit(function (ev) {
	ev.preventDefault();
	// get all attributes of form
	const title = $("[name='title']").val();
	const desc = $("[name='desc']").val();
	const ingredients = $("[data-ingredient]")
		.map(function () {
			const num = +$(this).find(`[name="ingredientQuantityNum"]`).val();
			const suffix = $(this)
				.find("[name='ingredientQuantitySuffix']")
				.val();
			const name = $(this).find(`[name="ingredientName"]`).val();

			return { name, quantity: { num, suffix } };
		})
		.get();

	const category = $("[name='category']").val();
	const steps = $("[name='steps']")
		.map(function () {
			return $(this).val().trim();
		})
		.get();
	const tags = $("[data-tag]")
		.map(function () {
			return $(this).data("tag");
		})
		.get();
	const image = $(`[name="image"]`).val();
	const region = $(`[name="region"]`).val();
	const servings = +$(`[name="servings"]`).val();
	const prepTime = $(`[name="prepTime"]`).val(); //TODO: convert it to seconds
	const cookTime = $(`[name="cookTime"]`).val(); // TODO: convert it to seconds
	const nutrition = {
		calories: +$(`[name='calories']`).val(),
		protein: +$(`[name='protein']`).val(),
		carb: +$(`[name='carb']`).val(),
		fat: +$(`[name='fat']`).val(),
	};

	const data = {
		title,
		desc,
		ingredients,
		category,
		steps,
		tags,
		image,
		region,
		servings,
		prepTime,
		cookTime,
		nutrition,
	};

	console.log(JSON.stringify(data));

	fetch("#", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	}).then(res => console.dir(res));
});
