// ............About session
var tablinks= document.getElementsByClassName("tab-links")
var tabcontents = document.getElementsByClassName("tab-clicks")

function opentab(tabname){
  for(tablink of tablinks){
    tablink.classList.remove('active-links')
  };

  for(tabcontent of tabcontents){
    tabcontent.classList.remove('active-tab')
  }
  event.currentTarget.classList.add('active-links')
  document.getElementById(tabname).classList.add("active-tab")
  
};

// .................3by3 gallery....................
var gallery = document.getElementById("gallery")


fetch('assets/gallery.json').then(function(res){
  res.json().then(function(json){
    json.forEach(function(el){
      var galleryItem= document.createElement("a");
      galleryItem.setAttribute("class", "gallery-item");
      galleryItem.setAttribute("href", el.links);
      galleryItem.setAttribute("target", "_blank");

      var galleryImage = document.createElement("img");
      galleryImage.setAttribute("src", el.url)
      galleryImage.setAttribute("title", el.caption)
      galleryImage.setAttribute("alt", el.caption)

      var caption = document.createElement("caption")
      caption.innerText = el.caption

      galleryItem.appendChild(galleryImage)
      galleryItem.appendChild(caption)

      gallery.appendChild(galleryItem)

    })
  })

})

// .....................Carousel................
var images = document.getElementById("carouselImages");
var caption = document.getElementById("carouselCaptions");
var prev = document.getElementById("carouselPrev");
var next = document.getElementById("carouselNext")

fetch("assets/gallery.json").then(function(res){
  res.json().then(function(json){
    json.forEach(function(el,i){
      var image= document.createElement('img')
      image.setAttribute('src', el.url)
      image.setAttribute('alt', el.caption)
      image.setAttribute('alt', el.caption)

      images.appendChild(image)
    })
    setupCarousel(json)
  })
})

function setupCarousel(json){
  var imageCount = images.childElementCount;
  var currentImage = 1;
  var imageWidth = 640;

  prev.addEventListener("click", function(e){
    e.preventDefault()
    if(currentImage !==1){
      --currentImage;
      images.style.left = imageWidth - (currentImage * imageWidth) + 'px'
    }
    caption.innerText= json[currentImage-1].caption
  })

  next.addEventListener("click", function(e){
    e.preventDefault()
    if(currentImage !=imageCount){
      ++currentImage;
      images.style.left = imageWidth - (currentImage * imageWidth) + 'px'
    }
    caption.innerText= json[currentImage-1].caption
  })
  caption.innerText = json[currentImage-1].caption

  
}

// ...................Onclick menu..........
var sidemenu= document.getElementById("nav-menu")
var home = document.getElementById("about")

function openmenu(){
  sidemenu.style.right='280px'
}

function closemenu(){
  sidemenu.style.right= '-250px'
}

// ..............Google script contact form............
const scriptURL = 'https://script.google.com/macros/s/AKfycbxpqY9ouT1ZcgekkQNNzdL6geF6U0inycxmo7ukHUjre2e4N_1WokvkqApng2VfJ_A/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg =  document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML = "message sent successfully"
        setTimeout(function(){
          msg.innerHTML= ""
        }, 5000);
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  });