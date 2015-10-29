<ul>
    <li ng-repeat="post in posts" class="post-{{post.id}}">
        <h2>{{post.title.rendered}}</h2>
        <div class="post-content" ng-bind-html="post.content.rendered"></div>
    </li>
</ul>