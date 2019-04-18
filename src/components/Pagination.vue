<template>
	<ul
		:class="{'pagination--disabled' : isDisabled}"
		class="pagination">
		<!-- Prew -->
		<li class="pagination__items">
			<button
				@click="prewPage()"
				:disabled="isFirstPage"
				class="pagination__btns icon-arrow-left"></button>
		</li>

		<!-- Main list -->
		<li
			v-for="(page) in getPagesLists.start"
			:key="page"
			@click="changeCurrentPage(page)"
			:class="isActivePage(page)"
			class="pagination__items">{{page}}</li>

		<!-- If list is too long -->

		<!-- Middle -->
		<template v-if="isTooLong && !isStartList && !isEndList">
			<li class="pagination__items">...</li>
			<li
				v-for="(page) in getPagesLists.middle"
				:key="page"
				@click="changeCurrentPage(page)"
				:class="isActivePage(page)"
				class="pagination__items">{{page}}</li>
		</template>

		<!-- End -->
		<template v-if="isTooLong">
			<li class="pagination__items">...</li>
			<li
				v-for="(page) in getPagesLists.end"
				:key="page"
				:class="isActivePage(page)"
				@click="changeCurrentPage(page)"
				class="pagination__items">{{page}}</li>
		</template>

		<!-- Next -->
		<li class="pagination__items">
			<button
				@click="nextPage()"
				:disabled="isLastPage"
				class="pagination__btns icon-arrow-right"></button>
		</li>
	</ul>
</template>

<script src="./pagination.js"></script>

<style>
.pagination {
	display: inline-flex;
	padding: 1px;
	border: 1px solid var(--c-grey-4);
	border-radius: 2px;
}
.pagination--disabled {
	pointer-events: none;
	opacity: .2;
}
.pagination__items {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	margin: 0 1px;
	color: var(--c-blue-11);
	cursor: pointer;
	z-index: 1;
}
.pagination__items::before {
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: rgba(36,36,36, .1);
	transform: scale(0);
	transform-origin: center;
	z-index: 0;
	transition: transform .3s;
}
.pagination__items:hover::before,
.pagination__items--active::before {
	transform: scale(1);
}
.pagination__btns {
	position: relative;
	width: 100%;
	height: 100%;
	background: transparent;
	color: inherit;
	z-index: 2;
}
.pagination__btns:disabled {
	color: var(--c-grey-4);
}
</style>
