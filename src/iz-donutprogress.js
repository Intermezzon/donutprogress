

class IzDonutProgress extends HTMLElement
{
	constructor()
	{
		super();

		//initializations
		this.created = false;

		this.animateStart = 0;
		this.animateEnd = 0;
		this.animateCurrent = 0;
		this.animateStep = 0;
	}

	createSvg()
	{
		const size = Number(this.getAttribute('size') || 100);
		const strokeWidth = Number(this.getAttribute('stroke') || 10);
		const radius = (size - strokeWidth) * 0.5;
		const center = size * 0.5;
		const color = this.getAttribute('color') || "rgba(255,0,0,0.7)";
		this.CIRC = Math.PI * 2 * radius;
		const circleAttributes = `cx="` + center + `" cy="` + center + `" r="` + radius + `"`;
		let svg = `<svg width="` + size + `" height="` + size + `" viewbox="0 0 ` + size + ` ` + size + `">
			<style>
			circle.iz-donut-circle {
				stroke: rgba(0,0,0,0.2);
				fill: transparent;
			}
			</style>
			<circle ` + circleAttributes + ` class="iz-donut-circle" style="stroke-width: ` + strokeWidth + `;"></circle>
			<circle ` + circleAttributes + ` class="iz-donut-circle progress" style="stroke-width: ` + strokeWidth + `;stroke:` + color + `;" stroke-dasharray="0 ` + this.CIRC + `" stroke-dashoffset="` + (this.CIRC * 0.25) + `"></circle>
			<text text-anchor="middle" dominant-baseline="middle" x="` + center + `" y="` + center + `">` + (this.getAttribute('content') || '') + `</text>
		</svg>`;
		this.innerHTML = svg;

		this.circle = this.querySelector('svg circle.progress');
	}

	render(val)
	{
		val = Math.max(0, Math.min(val, this.max));
		let l = val / this.max;

		this.circle.setAttribute('stroke-dasharray', (this.CIRC * l) + ' ' + (this.CIRC * (1 - l)));
		if (this.reverse) {
			this.circle.setAttribute('stroke-dashoffset', this.CIRC * (l - 0.75));
		}
	}

	animate()
	{
		this.animateStep--;
		if (this.animateStep) {
			window.requestAnimationFrame(e => {
				this.animate();
			});

			// Linear
			//this.animateCurrent = this.animateStart + (20 - this.animateStep) * (this.animateEnd - this.animateStart) / 20;

			// deaccel
			this.animateCurrent = this.animateCurrent + (this.animateEnd - this.animateCurrent) * 0.2;

			this.render(this.animateCurrent);
		} else {
			this.render(this.animateEnd);		
		}
	}

	setValue(val)
	{
		const startAnim = !this.animateStep;
		this.animateEnd = Math.max(0, Math.min(val, this.max));
		this.animateStep = 20;
		this.animateStart = this.animateCurrent;

		if (startAnim) {
			this.animate();
		}
	}

	connectedCallback()
	{
		if (!this.created) {
			this.created = true;
			this.max = Number(this.getAttribute('max') || 100);
			this.reverse = !!this.getAttribute('reverse');

			this.createSvg();
			this.setValue(Number(this.getAttribute('value') || 0));
		}
	}

	static get observedAttributes() {
		return ['value', 'max'];
	}

	attributeChangedCallback(name, oldVal, val)
	{
		if (this.created && name == 'value') {
			this.setValue(Number(val));
		}
	}
}

// Register tag
window.customElements.define('iz-donutprogress', IzDonutProgress);

