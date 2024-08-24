class Sidebar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <aside>
                <!-- sidebar-logo -->
                <div class="d-flex">
                    <button class="toggle-btn" type="button">
                        <i class="lni lni-grid-alt"></i>
                    </button>
                    <div class="sidebar-logo">
                        <a href="/dashboard.html">ApaMa</a>
                    </div>
                </div>

                <!-- sidebar-nav -->
                <ul class="sidebar-nav">
                    <li class="sidebar-item">
                        <a href="/dashboard.html" class="sidebar-link sidebar-father">
                            <i class="lni lni-home"></i>
                            <span>Home</span>
                        </a>
                    </li>
                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link sidebar-father collapsed has-dropdown" data-bs-toggle="collapse"
                            data-bs-target="#user" aria-expanded="false" aria-controls="user">
                            <i class="lni lni-user"></i>
                            <span>Users</span>
                        </a>
                        <ul id="user" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item">
                                <a href="/admin-list.html" class="sidebar-link sidebar-child">
                                    <i class="lni lni-user"></i>
                                    <span>Administrators</span>
                                </a>
                            </li>
                            <li class="sidebar-item">
                                <a href="/organization-search.html" class="sidebar-link sidebar-child">
                                    <i class="lni lni-world"></i>
                                    <span>Organizations</span>
                                </a>
                            </li>
                            <li class="sidebar-item">
                                <a href="/normal-user-search.html" class="sidebar-link sidebar-child">
                                    <i class="lni lni-network"></i>
                                    <span>Normal Users</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link sidebar-father collapsed has-dropdown" data-bs-toggle="collapse"
                            data-bs-target="#apa" aria-expanded="false" aria-controls="apa">
                            <i class="lni lni-apartment"></i>
                            <span>Apartments</span>
                        </a>
                        <ul id="apa" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item">
                                <a href="/apartment-search.html" class="sidebar-link sidebar-child">
                                    <i class="lni lni-apartment"></i>
                                    <span>Apartments</span>
                                </a>
                            </li>
                            <li class="sidebar-item">
                                <a href="/market-search.html" class="sidebar-link sidebar-child">
                                    <i class="lni lni-shopping-basket"></i>
                                    <span>Markets</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-item">
                        <a href="/market-search.html" class="sidebar-link sidebar-father">
                            <i class="lni lni-cart"></i>
                            <span>Markets</span>
                        </a>
                    </li>
                    <li class="sidebar-item">
                        <a href="/notification.html" class="sidebar-link sidebar-father">
                            <i class="lni lni-popup"></i>
                            <span>Notifications</span>
                        </a>
                    </li>
                    <li class="sidebar-item">
                        <a href="/setting.html" class="sidebar-link sidebar-father">
                            <i class="lni lni-cog"></i>
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>

                <!-- sidebar-footer-->
                <div class="sidebar-footer">
                    <a href="/my-account.html" class="sidebar-link sidebar-father">
                        <i class="lni lni-happy"></i>
                        <span>My Account</span>
                    </a>
                    <a href="#" class="sidebar-link sidebar-father lgo-btn">
                        <i class="lni lni-exit"></i>
                        <span>Logout</span>
                    </a>
                </div>
            </aside>
        `;
        this.attachEventHandlers();
    }

    attachEventHandlers() {
        const hamBurger = document.querySelector(".toggle-btn");
        const logoutButton = document.querySelector(".lgo-btn");
        hamBurger.addEventListener("click", function () {
            document.querySelector("#sidebar").classList.toggle("expand");
        });

        function logout() {
            window.location.href = "../pages/admin-login.html";
        };

        logoutButton.addEventListener("click", function () {
            logout()
        });
    }
}

customElements.define("app-sidebar", Sidebar);