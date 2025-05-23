document.addEventListener('DOMContentLoaded', () => {
  const carouselItems = document.querySelectorAll('.carouselItem')
  const allVideos = document.querySelectorAll('video')

  const originalSrcMap = new Map()

  carouselItems.forEach(item => {
    const video = item.querySelector('video')
    const btn = item.querySelector('.cardPlayBtn')
    const btnImg = item.querySelector('.cardPlayBtnImg')

    if (btnImg) {
      originalSrcMap.set(video, btnImg.getAttribute('src'))
    }

    const toggleVideo = () => {
      allVideos.forEach(v => {
        const thisBtnImg = v
          .closest('.carouselItem')
          .querySelector('.cardPlayBtnImg')
        if (v !== video) {
          v.pause()
          if (thisBtnImg && originalSrcMap.has(v)) {
            thisBtnImg.setAttribute('src', originalSrcMap.get(v))
          }
        }
      })

      if (video.paused) {
        video.play()
        if (btnImg) {
          btnImg.setAttribute('src', 'images/pause.png')
        }
      } else {
        video.pause()
        if (btnImg && originalSrcMap.has(video)) {
          btnImg.setAttribute('src', originalSrcMap.get(video))
        }
      }
    }

    video.addEventListener('click', toggleVideo)
    btn.addEventListener('click', toggleVideo)
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const carouselWrap = document.querySelector('.carouselWrap')
  const carouselItems = document.querySelectorAll('.carouselItem')
  const itemWidth = carouselItems[0].getBoundingClientRect().width + 10 
  const totalItems = carouselItems.length

  let currentIndex = 0

  const updatePosition = () => {
    const offset = -currentIndex * itemWidth
    carouselWrap.style.transform = `translateX(${offset}px)`
    carouselWrap.style.transition = 'transform 0.3s ease-in-out'
  }

  document.querySelector('.nextBtn').addEventListener('click', () => {
    const visibleWidth = document.querySelector('.card-wrapper').offsetWidth
    const totalWidth = itemWidth * totalItems
    const currentOffset = (currentIndex + 1) * itemWidth

    if (currentOffset + visibleWidth > totalWidth) {
      currentIndex = 0
    } else {
      currentIndex++
    }

    updatePosition()
  })

  document.querySelector('.prevBtn').addEventListener('click', () => {
    const visibleWidth = document.querySelector('.card-wrapper').offsetWidth

    if (currentIndex === 0) {
      currentIndex = totalItems - Math.floor(visibleWidth / itemWidth)
      if (currentIndex < 0) currentIndex = 0
    } else {
      currentIndex--
    }

    updatePosition()
  })
})
