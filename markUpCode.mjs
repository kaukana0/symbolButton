/*
all HTML and CSS as JS string
*/

// TODO: refactor to make the whole thing more flexible and better
export default class MarkUpCode {

  static getCSS() {
    return `
    <style>
    svg {
      --blue: #0e47cb;
      --yellowish: #b09121;
      --greyish: #cfdaf5;
      width: 100%;
      height: 100%;
    }

    //.hov:hover #background { fill:var(--yellowish); }
    //.hov:hover #symbol { fill:white; }

    .hov:hover #background {  filter: invert(100%); }
    .hov:hover #symbol { filter: invert(100%); }

    </style>   
    `
  }


  static #symbols = {}
  static {
    this.#symbols["close"] = this.getSymbolClose
    this.#symbols["lineChart"] = this.getSymbolLineChart
    this.#symbols["barChart"] = this.getSymbolBarChart
    this.#symbols["dotPlot"] = this.getSymbolDotPlot
    this.#symbols["star"] = this.getSymbolStar
    this.#symbols["starFilled"] = this.getSymbolStarFilled
    this.#symbols["sharing"] = this.getSharing
    this.#symbols["sharingBlue"] = this.getSharingBlue
    this.#symbols["info"] = this.getInfo
    this.#symbols["infoWhite"] = this.getInfoWhite
  }

	// helper
	static getHtmlTemplate(source) {
		const t = document.createElement('template')
		t.innerHTML = source
		return t.content
	}

  static get(symbol, symbolDeactivated=null, isHoverable=true, w=40, h=40) {
    if(w===null) {w=40}
    if(h===null) {h=40}
    if(isHoverable===null) {isHoverable=true}

    let retVal = `
    <svg id="sa" class="${isHoverable?"hov":""}" width="${w}px" height="${w}px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer; pointer-events: auto;" tabindex="0">
      ${this.#symbols[symbol](true)}
    </svg>`

    if(symbolDeactivated) {
      retVal += `
      <svg id="sd" class="${isHoverable?"hov":""}" width="${w}px" height="${w}px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer; pointer-events: auto;" tabindex="0">
        ${this.#symbols[symbolDeactivated]()}
      </svg>`
    }

    retVal += this.getCSS()

    return retVal
  }

  static circle() {
    return `<circle id="background" fill="#cfdaf5" cx="256" cy="256" r="256" />`
  }

  static circleWhite() {
    return `<circle id="background" fill="white" cx="256" cy="256" r="256" />`
  }

  static getSymbolClose() {
    return `
    ${MarkUpCode.circle()}
    <g transform="scale(0.6, 0.6) translate(230 180)">
      <path id="symbol" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" fill="#0e47cb" stroke-width="0"/>
    </g>
    `
  }

  static getSymbolLineChart(wCircle) {
    return `
    ${wCircle?MarkUpCode.circle():""}
    <g transform="scale(0.6, 0.6) translate(210 180)">
      <path id="symbol" d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z" fill="#0e47cb" stroke-width="0"/>
    </g>
    `
  }

  static getSymbolBarChart(wCircle) {
    return `
    ${wCircle?MarkUpCode.circle():""}
    <g transform="scale(0.6, 0.6) translate(210 180)">
      <path id="symbol" d="M332.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8V172.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V76.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-288 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zM496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z" fill="#0e47cb" stroke-width="0"/>
    </g>
    `
  }

  static getSymbolDotPlot(wCircle) {
    function circlePath(cx,cy) {
      const r = 50
      return `M ${cx} ${cy}
      m ${r}, 0
      a ${r},${r} 0 1,0 -${r*2},0
      a ${r},${r} 0 1,0  ${r*2},0`
    }

    const bla =  `
    ${wCircle?MarkUpCode.circle():""}
    <g transform="scale(0.6, 0.6) translate(210 180)">
      <path id="symbol" fill="#0e47cb" stroke-width="0" 
        d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z 
        ${circlePath(170,150)}  
        ${circlePath(170,300)} 
        ${circlePath(295,125)} 
        ${circlePath(295,240)} 
        ${circlePath(415,160)} 
        ${circlePath(415,325)} 
      "/>
    </g>
    `

    return bla
  }

  static getSymbolStarFilled() {
      return `
    <g transform="scale(0.6, 0.6) translate(210 180)">
      <path id="symbol" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" fill="#0e47cb" stroke-width="0"/>
    </g>
    `
  }

  static getSymbolStar() {
    return `
    <g transform="scale(0.6, 0.6) translate(210 180)">
      <path id="symbol" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z" fill="#0e47cb" stroke-width="0"/>
    </g>
    `
  }

  // viewBox="0 0 24 24"
  static getSharing(isWhite=true) {
    return `
    <g transform="scale(20, 20)">
      <path id="symbol" d="M18 16c-.7 0-1.3.2-1.8.6L9 12.4v-.8l7.3-4.2c.4.4 1 .6 1.7.6 1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3c0 .3 0 .5.1.8l-7 4.1C7.5 9.3 6.8 9 6 9c-1.7 0-3 1.3-3 3s1.3 3 3 3c.8 0 1.5-.3 2.1-.8l7 4.1c-.1.2-.1.4-.1.7 0 1.7 1.3 3 3 3s3-1.3 3-3-1.3-3-3-3" fill="${isWhite?"white":"var(--blue)"}"/>
    </g>
    `
  }

  static getSharingBlue() {
    return MarkUpCode.getSharing(false)
  }

  static getInfo() {
    return `
    ${MarkUpCode.circle()}
    <g transform="scale(0.5, 0.5) translate(400 210)">
      <path id="symbol" d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z" fill="#0e47cb"></path>
    </g>
    `
  }

  static getInfoWhite() {
    return `
    ${MarkUpCode.circleWhite()}
    <g transform="scale(0.5, 0.5) translate(400 210)">
      <path id="symbol" d="M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z" fill="#0e47cb"></path>
    </g>
    `
  }

}