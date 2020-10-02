/*
Todo:
HTML + CSS:
  ✔ Nav bar
  ✔ Header
  ✔ filter bar
  ✔ footer
  ⌛ Anime Card
    ✔ Main content
    ❌ watch sidebar status
    ❌ watch time info
    ❌ scrollbar
  
Javascript
  ❌ Component for anime cards
  ❌ Fetch data to create anime card
  ❌ Local Storage
    ❌ anime card watch status
  ❌ Nav bar drop down (Optional if ceebz)
*/

let main = document.querySelector(".main");
let animeCardTemplate = document.querySelector("#anime-card-template");

const NUMBER_OF_ANIME_CARDS = 20;

// UNIT TEST

// let animeCardJsonTest = {
//     title: "Fire Force Season 2",
//     tags: ["Action", "Shounen", "Supernatural"],
//     studio: "David Production",
//     studioLink: "#",
//     firstAirDatetime: "Oct 3, 2020 at 1:55am JST",
//     adaptedFrom: "Manga",
//     numberOfEpisodes: "24",
//     lengthOfEpisdesInMin: "24",
//     descriptionParagraphs: [
//         "Shinra and Company 8 have figured out the Evangelist’s goal: to gather Adolla Bursts from Shinra and Shou. After learning more about his past from Captain Burns, Shinra becomes more motivated to discover the truth about his mother and save Shou again.",
//         "But a mysterious girl known as the “First Pillar” reveals the Evangelist’s master plan to start another Great Cataclysm!",
//         "This is another paragraph, mainly for Derek's testing haha 😂😂😂",
//     ],
//     descriptionSource: "Funimation",
//     descriptionSourceLink: "#",
//     distributors: ["Crunchy Roll", "MAL"],
//     mainImageUrl:
//         "https://u.livechart.me/anime/9746/poster_image/eb1eee2e718aa6dba74f32bd28997f63.jpg?style=small&format=jpg",
// };
// main.appendChild(createAnimeCard(animeCardJsonTest));

// Create anime cards using jikan api
fetch("https://api.jikan.moe/v3/season/2020/fall")
    .then((response) => response.json())
    .then((data) => {
        let animeJson = data.anime;
        for (let i = 0; i < NUMBER_OF_ANIME_CARDS; i++) {
            console.log(animeJson[i]);
            let animeCardData = {
                title: animeJson[i].title,
                tags: animeJson[i].genres.map((genre) => genre.name),
                studio: animeJson[i].producers[0].name,
                studioLink: "#", // DEREK
                firstAirDatetime: animeJson[i].airing_start,
                adaptedFrom: animeJson[i].source,
                numberOfEpisodes: animeJson[i].episodes,
                lengthOfEpisdesInMin: 24, //DEREK
                descriptionParagraphs: [animeJson[i].synopsis],
                descriptionSource: "MyAnimeList", //DEREK
                descriptionSourceLink: animeJson[i].url,
                distributors: ["Crunchy Roll", "MAL"],
                mainImageUrl: animeJson[i].image_url,
            };
            main.appendChild(createAnimeCard(animeCardData));
        }
    });

// FUNCTIONS

function createAnimeCard(animeCardJson) {
    let animeCard = animeCardTemplate.content.cloneNode(true);

    // Title
    let title = animeCard.querySelector(".anime-card__title");
    title.querySelector(".anime-card__link").textContent = animeCardJson.title;

    // Tags
    let animeTags = animeCard.querySelector(".anime-card__tag-container");
    animeTags.textContent = null;
    for (let i = 0; i < animeCardJson.tags.length; i++) {
        let tag = document.createElement("div");
        tag.classList.add("anime-card__tag");

        let tagLink = document.createElement("a");
        tagLink.href = "#";
        tagLink.textContent = animeCardJson.tags[i];

        tag.appendChild(tagLink);

        animeTags.appendChild(tag);
    }

    //   Main Anime Card Image
    let mainImage = animeCard.querySelector(".anime-card__image");
    mainImage.setAttribute("src", animeCardJson.mainImageUrl);
    mainImage.setAttribute("alt", `${animeCardJson.title} Image`);

    // image info
    // DEREK TODO - INCLUDE HOVER to display none on image info

    // Anime Card Info
    let studio = animeCard.querySelector(".anime-card__studio");
    let firstAirtime = animeCard.querySelector(".anime-card__first-airtime");
    let adaptedFrom = animeCard.querySelector(".anime-card__adapted-from");
    let episodeInfo = animeCard.querySelector(".anime-card__episode-info");

    studio.textContent = `${animeCardJson.studio}`;
    studio.href = `${animeCardJson.studioLink}`;
    firstAirtime.textContent = `${animeCardJson.firstAirDatetime}`;
    adaptedFrom.textContent = `${animeCardJson.adaptedFrom}`;
    episodeInfo.textContent = `${animeCardJson.numberOfEpisodes} eps × ${animeCardJson.lengthOfEpisdesInMin} min`;

    // Anime description
    let animeDescriptionContainer = animeCard.querySelector(
        ".anime-card__description-container"
    );
    animeDescriptionContainer.textContent = null;
    for (paragraph of animeCardJson.descriptionParagraphs) {
        let animeCardParagraph = createAnimeCardParagraph(paragraph);
        animeDescriptionContainer.appendChild(animeCardParagraph);
        animeDescriptionContainer.appendChild(document.createElement("br"));
    }
    let descriptionSource = createAnimeCardParagraph(null);
    descriptionSource.innerHTML = `<i>[Source: <a class="anime-card__description-source anime-card__link" href="${animeCardJson.descriptionSourceLink}">${animeCardJson.descriptionSource}</a>]</i>`;
    animeDescriptionContainer.appendChild(descriptionSource);

    return animeCard;
}

function createAnimeCardParagraph(paragraph) {
    let animeCardParagraph = document.createElement("p");
    animeCardParagraph.classList.add("anime-card__description");
    animeCardParagraph.textContent = paragraph;
    return animeCardParagraph;
}
