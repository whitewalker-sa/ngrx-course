import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { User } from "./auth/model/user.model";
import { AuthState } from "./auth/store/reducers";
import { isLoggedIn, isLoggedOut } from "./auth/store/selectors/auth.selectors";
import { login, logout } from "./auth/store/actions/auth.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loading = true;
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private router: Router, private store: Store<AuthState>) {}

  ngOnInit() {
    const userProfile = localStorage.getItem("user");
    
    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    //Alternative of querying the store but it runs the calculations multiple times even when the value hasn't changed
    /*  this.isLoggedIn$ = this.store.pipe(
      map((state: AuthState) => !!state[authFeatureKey].user)
    );

    this.isLoggedOut$ = this.store.pipe(
      map((state: AuthState) => !state[authFeatureKey].user)
    ); */

    // Using the select operator from ngrx will only calculate a new output if the input changes, this optimizes the code to perform better
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
