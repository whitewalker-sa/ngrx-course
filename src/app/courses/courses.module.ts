import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { CoursesCardListComponent } from "./courses-card-list/courses-card-list.component";
import { EditCourseDialogComponent } from "./edit-course-dialog/edit-course-dialog.component";
import { CoursesHttpService } from "./services/courses-http.service";
import { CourseComponent } from "./course/course.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Routes } from "@angular/router";
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from "@ngrx/data";
import { CourseEntityService } from "./services/course-entity.service";
import { CoursesResolver } from "./services/courses.resolver";
import { CoursesDataService } from "./services/course-data.service";
import { compareCourses } from "./model/course";
import { compareLessons } from "./model/lesson";
import { LessonEntityService } from "./services/lesson-entity.service";

export const coursesRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    resolve: { courses: CoursesResolver },
  },
  {
    path: ":courseUrl",
    component: CourseComponent,
    resolve: {
      courses: CoursesResolver,
    },
  },
];

const entityMetadata: EntityMetadataMap = {
  Course: {
    sortComparer: compareCourses,

    entityDispatcherOptions: {
      optimisticUpdate: true, // This updates the UI with data before the a response is returned from the server. It's false by default
    },
  },
  Lesson: {
    sortComparer: compareLessons,
  },
};

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes),
  ],
  declarations: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent,
  ],
  exports: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent,
  ],
  entryComponents: [EditCourseDialogComponent],
  providers: [
    CoursesHttpService,
    LessonEntityService,
    CourseEntityService,
    CoursesResolver,
    CoursesDataService,
  ],
})
export class CoursesModule {
  /**
   * @param entityDefinitionService is used to inject the entity definition service since the courses module is lazy loaded
   * This will allow us to for example, query the data from the backend and save it on the store
   * It will also allow us to interact with the data directly in the store
   */
  constructor(
    private entityDefinitionService: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private courseDataService: CoursesDataService
  ) {
    entityDefinitionService.registerMetadataMap(entityMetadata);
    entityDataService.registerService("Course", courseDataService);
  }
}
