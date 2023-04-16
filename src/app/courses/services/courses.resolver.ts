import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AppState } from "../../reducers";
import { Store, select } from "@ngrx/store";
import { filter, finalize, first, tap } from "rxjs/operators";
import { CourseActions } from "../store/actions/action-types";
import { areCoursesLoaded } from "../store/selectors/courses.selectors";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areCoursesLoaded), 
      tap((coursesLoaded) => {
        if (!this.loading && !coursesLoaded) {
          this.loading = true;
          this.store.dispatch(CourseActions.loadAllCourses());
        }
      }),
      filter(coursesLoaded => coursesLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
