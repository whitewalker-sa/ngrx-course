import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../../model/course";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "../actions/action-types";

export interface CoursesState extends EntityState<Course> {
  // best way of defining the entity format below is to extend using EntityState thats extended above
  // Created an entities dictionary
  // this is a key value map whose identifiers of the entities and the values are the entities themselves
  /*  entities: {
    [key: number]: Course;
  };
  ids: number[]; */

  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  selectId: (course) => course.id, // use this approach if you have custom unique identifier property either than the default id property
});

export const initialState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
  initialState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapter.addMany(action.courses, { ...state, allCoursesLoaded: true })
  ),
  on(CourseActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export const { selectAll } = adapter.getSelectors();
