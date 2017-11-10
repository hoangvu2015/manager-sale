class About {
    constructor() {
        this.sliderAbout();
    }

    sliderAbout() {
        $("#slider").slick();
    }
}

let about = new About();
export default about;
window.About = about;