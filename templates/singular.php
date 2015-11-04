<div ng-repeat="post in posts" class="post-{{post.id}}">

	<h1>{{post.title.rendered}}</h1>

	<div class="post-content" ng-bind-html="post.content.rendered"></div>

</div>