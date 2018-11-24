/**
 * Gallery closure
 */
(function () {
    const galleryId = "home-gallery";
    const itemWidth = 340;
    let currentItem = 0;

    /**
     * Initialize home gallery
     */
    function __initializeGallery(galleryId) {
        let container = $(`#${galleryId}`);
        let items = $(`#${galleryId} .home-gallery__items__item`);
        let itemsContainer = $(`#${galleryId} .home-gallery__items`);


        // Get total with of all items, and set width to contain all of them
        let totalWidth = 0;
        $.each(items, function (_, item) {
            totalWidth += $(item).outerWidth()
        });
        if ($(window).width() > 600){
            $(itemsContainer).css({width: totalWidth + 400 + 'px'});
        }else{
            $("button").css({width: '50px', 'margin-top': '60px'});
        }
        // Move gallery to middle
        __switchGalleryActiveItem(Math.floor(items.length / 2));

        // Fade gallery in
        setTimeout(function () {
            $(container).animate({opacity: 1});
        }, 500);
    }

    /**
     * Switch currently active item within the gallery
     */
    function __switchGalleryActiveItem(id) {
        currentItem = id;
        let itemsContainer = $(`#${galleryId} .home-gallery__items`);
        let items = $(`#${galleryId} .home-gallery__items__item`);

        $(items).removeClass("home-gallery__items__item--active");
        $(items[id]).addClass("home-gallery__items__item--active");

        const baseOffset = ($(`#${galleryId} .container`).width() / 2 - itemWidth / 2); // Base left offset
        $(itemsContainer).animate({
            left: baseOffset - id * itemWidth
        }, 500);
    }

    /**
     * Get total gallery item count
     * @returns {int}
     */
    function getGalleryItemCount() {
        return $(`#${galleryId} .home-gallery__items__item`).length;
    }

    /**
     * Switch to next gallery item
     */
    function nextGalleryItem() {
        currentItem = (currentItem + 1) % getGalleryItemCount();
        __switchGalleryActiveItem(currentItem);
    }

    /**
     * Switch to previous gallery item
     */
    function previousGalleryItem() {
        currentItem = (currentItem - 1) % getGalleryItemCount();
        if (currentItem < 0) currentItem = getGalleryItemCount() - 1;
        __switchGalleryActiveItem(currentItem);
    }

    // Expose functions to global context
    window.nextGalleryItem = nextGalleryItem;
    window.previousGalleryItem = previousGalleryItem;
    __initializeGallery(galleryId);

})();