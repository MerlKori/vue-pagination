export default {
	name: 'Pagination',
	model: {
		prop: 'currentPage',
		event: 'change-page'
	},
	props: {
		pagesList: {
			type: Array,
			default: () => [1]
		},
		currentPage: {
			type: Number,
			default: 1
		},
		maxVisibleItems: {
			type: Number,
			default: 4
		}
	},
	methods: {
		changeCurrentPage (page) {
			this.$emit('change-page', page);
		},
		nextPage () {
			const next = this.pagesList[this.getCurrentPageIdx + 1];
			this.changeCurrentPage(next);
		},
		prewPage () {
			const prew = this.pagesList[this.getCurrentPageIdx - 1];
			this.changeCurrentPage(prew);
		},
		isActivePage (page) {
			return this.currentPage === page ? 'pagination__items--active' : null;
		}
	},
	computed: {
		getPagesCount () {
			return this.pagesList.length;
		},
		getCurrentPageIdx () {
			return this.pagesList.indexOf(this.currentPage);
		},
		getFirstPagesList () {
			return this.pagesList.slice(0, this.maxVisibleItems);
		},
		getLastPagesList () {
			return this.pagesList.slice(this.getPagesCount - this.maxVisibleItems, this.getPagesCount);
		},
		getFirstPage () {
			return this.pagesList[0];
		},
		getLastPage () {
			return this.pagesList[this.getPagesCount - 1];
		},
		isTooLong () {
			return this.getPagesCount > this.maxVisibleItems;
		},
		/* isLastPage and isFirstPage for btn disabled */
		isLastPage () {
			return this.getLastPage === this.currentPage;
		},
		isFirstPage () {
			return this.getFirstPage === this.currentPage;
		},
		isStartList () {
			/* without last items in list */
			const list = this.getFirstPagesList.slice(0, this.getFirstPagesList.length - 1);
			return list.includes(this.currentPage);
		},
		isEndList () {
			/* without first items in list */
			const list = this.getLastPagesList.slice(1);
			return list.includes(this.currentPage);
		},
		isDisabled () {
			return this.pagesList.length < 2;
		},
		getPagesLists () {
			let start = [];
			let	middle = [];
			let	end = [];

			/* Short list */
			if (!this.isTooLong) {
				start = this.pagesList;
			}

			/* START */
			if (this.isStartList && this.isTooLong) {
				start = this.getFirstPagesList;
				end = [this.getLastPage];
			}

			/* Not Start and Not End */
			if (!this.isStartList && !this.isEndList && this.isTooLong) {
				start = [this.getFirstPage];
				middle = this.pagesList.slice(this.getCurrentPageIdx - 1, this.maxVisibleItems + this.getCurrentPageIdx - 1);
				end = [this.getLastPage];
			}

			/* END */
			if (this.isEndList && this.isTooLong) {
				start = [this.getFirstPage];
				end = this.getLastPagesList;
			}

			return {start, middle, end};
		}
	}
};
