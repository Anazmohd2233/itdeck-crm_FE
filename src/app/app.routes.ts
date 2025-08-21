import { Routes } from '@angular/router';
import { NotFoundComponent } from './common/not-found/not-found.component';
// import { ProjectManagementComponent } from './dashboard/project-management/project-management.component';
import { CrmComponent } from './dashboard/crm/crm.component';
// import { LmsComponent } from './dashboard/lms/lms.component';
import { HelpDeskComponent } from './dashboard/help-desk/help-desk.component';
import { InvoiceDetailsComponent } from './pages/invoices-page/invoice-details/invoice-details.component';
import { InvoicesComponent } from './pages/invoices-page/invoices/invoices.component';
import { InvoicesPageComponent } from './pages/invoices-page/invoices-page.component';
import { ToDoListComponent } from './apps/to-do-list/to-do-list.component';
import { CalendarComponent } from './apps/calendar/calendar.component';
import { ChatComponent } from './apps/chat/chat.component';
import { KanbanBoardComponent } from './apps/kanban-board/kanban-board.component';
import { TermsConditionsComponent } from './settings/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './settings/privacy-policy/privacy-policy.component';
import { ConnectionsComponent } from './settings/connections/connections.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { AccountSettingsComponent } from './settings/account-settings/account-settings.component';
import { SettingsComponent } from './settings/settings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { ConfirmEmailComponent } from './authentication/confirm-email/confirm-email.component';
import { LockScreenComponent } from './authentication/lock-screen/lock-screen.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { PProjectsComponent } from './pages/profile-page/p-projects/p-projects.component';
import { TeamsComponent } from './pages/profile-page/teams/teams.component';
import { UserProfileComponent } from './pages/profile-page/user-profile/user-profile.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { HdReportsComponent } from './pages/help-desk-page/hd-reports/hd-reports.component';
import { HdAgentsComponent } from './pages/help-desk-page/hd-agents/hd-agents.component';
import { HdTicketDetailsComponent } from './pages/help-desk-page/hd-ticket-details/hd-ticket-details.component';
import { HdTicketsComponent } from './pages/help-desk-page/hd-tickets/hd-tickets.component';
import { HelpDeskPageComponent } from './pages/help-desk-page/help-desk-page.component';
import { LInstructorsComponent } from './pages/lms-page/l-instructors/l-instructors.component';
import { LEditCourseComponent } from './pages/lms-page/l-edit-course/l-edit-course.component';
import { LCreateCourseComponent } from './pages/lms-page/l-create-course/l-create-course.component';
import { LCourseDetailsComponent } from './pages/lms-page/l-course-details/l-course-details.component';
import { LCoursesComponent } from './pages/lms-page/l-courses/l-courses.component';
import { LmsPageComponent } from './pages/lms-page/lms-page.component';
import { CCreateDealComponent } from './pages/crm-page/c-create-deal/c-create-deal.component';
import { CDealsComponent } from './pages/crm-page/c-deals/c-deals.component';
import { CLeadsComponent } from './pages/crm-page/c-leads/c-leads.component';
import { CEditLeadComponent } from './pages/crm-page/c-edit-lead/c-edit-lead.component';
import { CCreateLeadComponent } from './pages/crm-page/c-create-lead/c-create-lead.component';
import { CLeadKanbanComponent } from './pages/crm-page/c-lead-kanban/c-lead-kanban.component';
import { CCustomersComponent } from './pages/crm-page/c-customers/c-customers.component';
import { CEditContactComponent } from './pages/crm-page/c-edit-contact/c-edit-contact.component';
import { CCreateContactComponent } from './pages/crm-page/c-create-contact/c-create-contact.component';
import { CContactsComponent } from './pages/crm-page/c-contacts/c-contacts.component';
import { CrmPageComponent } from './pages/crm-page/crm-page.component';
import { StudentProfileComponent } from './pages/crm-page/student-profile/student-profile.component';
import { HdCreateTicketComponent } from './pages/help-desk-page/hd-create-ticket/hd-create-ticket.component';
import { InoviceComponent } from './pages/crm-page/inovice/inovice.component';
import { StudentRegFormComponent } from './pages/student-reg-form/student-reg-form.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersListComponent } from './pages/users-page/users-list/users-list.component';
import { AddUserComponent } from './pages/users-page/add-user/add-user.component';
import { PmTeamsComponent } from './pages/users-page/pm-teams/pm-teams.component';
import { TeamMembersComponent } from './pages/users-page/team-members/team-members.component';
import { ProjectManagementComponent } from './pages/project-management/project-management.component';
import { StudentsComponent } from './apps/student/students.component';
import { EditStudentComponent } from './apps/student/edit-student/edit-student.component';
import { ProfileStudentComponent } from './apps/student/profile-student/profile-student.component';
import { AuthGuard } from './helpers/auth_gaurd';
// import { HdReportsComponent } from './pages/hd-reports/hd-reports.component';

export const routes: Routes = [
    {path: '', redirectTo: 'authentication', pathMatch: 'full'},
    {path: 'crm', component: CrmComponent , canActivate: [AuthGuard]},
    // {path: 'report', component: HdReportsComponent},
    // {path: 'team-report', component: ProjectManagementComponent},
    // {path: 'lms', component: LmsComponent},
    // {path: 'help-desk', component: HelpDeskComponent},
    {
        path: 'users', 
        component: UsersPageComponent,
        children: [
            {path: '', component: UsersListComponent},
            {path: 'add-user', component: AddUserComponent},
        ]
    },

    {
        path: 'teams',
        component: UsersPageComponent,
        children: [
            {path: '', component: PmTeamsComponent},
            // {path: 'team-details', component: TeamMembersComponent}
        ]
    },

    // {path: 'to-do-list', component: ToDoListComponent},
    // {path: 'calendar', component: CalendarComponent},
    {path: 'student', component: StudentsComponent , canActivate: [AuthGuard]},
    {path: 'edit-student', component: EditStudentComponent},
    // {path: 'chat', component: ChatComponent},
    // {path: 'kanban-board', component: KanbanBoardComponent},
    {
        path: 'crm-page',
        component: CrmPageComponent,
         canActivate: [AuthGuard],
        children: [
            {path: '', component: CContactsComponent},
            {path: 'create-contact', component: CCreateContactComponent},
            {path: 'edit-contact', component: CEditContactComponent},
            {path: 'customers', component: CCustomersComponent},
            {path: 'create-lead', component: CCreateLeadComponent},
            {path: 'edit-lead', component: CEditLeadComponent},
            {path: 'leads', component: CLeadsComponent},
            {path: 'leads-kanban', component: CLeadKanbanComponent},
            // {path: 'profile', component: ProfileStudentComponent},
            {path: 'deals', component: CDealsComponent},
            {path: 'create-deal', component: CCreateDealComponent},
            {path: 'invoice', component: InoviceComponent}
        ]
    },
    {path: 'student-registration', component: StudentRegFormComponent}, //public form
    {
        path: 'lms-page',
        component: LmsPageComponent,
        children: [
            {path: '', component: LCoursesComponent},
            {path: 'course-details', component: LCourseDetailsComponent},
            {path: 'create-course', component: LCreateCourseComponent},
            {path: 'edit-course', component: LEditCourseComponent},
            {path: 'instructors', component: LInstructorsComponent}
        ]
    }, 
    {
        path: 'task',
        component: HelpDeskPageComponent,
         canActivate: [AuthGuard],
        children: [
            {path: '', component: HdTicketsComponent},
            {path: 'ticket-details', component: HdTicketDetailsComponent},
            {path: 'agents', component: HdAgentsComponent},
            {path: 'reports', component: HdReportsComponent},
            {path: 'create-ticket', component: HdCreateTicketComponent}
        ]
    },
    {
        path: 'payments',
        component: InvoicesPageComponent,
         canActivate: [AuthGuard],
        children: [
            {path: '', component: InvoicesComponent},
            {path: 'payment-details', component: InvoiceDetailsComponent},
        ]
    },
    {
                    // {path: 'profile', component: ProfileStudentComponent},

        path: 'profile',
         canActivate: [AuthGuard],
        component: ProfileStudentComponent,
        children: [
            {path: '', component: ProfileStudentComponent},
            {path: 'teams', component: TeamsComponent},
            {path: 'projects', component: PProjectsComponent},
        ]
    },
    {
        path: 'authentication',
        component: AuthenticationComponent,
        children: [
            {path: '', component: SignInComponent},
            {path: 'sign-up', component: SignUpComponent},
            {path: 'forgot-password', component: ForgotPasswordComponent},
            {path: 'reset-password', component: ResetPasswordComponent},
            {path: 'lock-screen', component: LockScreenComponent},
            {path: 'confirm-email', component: ConfirmEmailComponent},
            {path: 'logout', component: LogoutComponent},
        ]
    },
    {path: 'my-profile', component: MyProfileComponent},
    {
        path: 'settings',
        component: SettingsComponent,
        children: [
            {path: '', component: AccountSettingsComponent},
            {path: 'change-password', component: ChangePasswordComponent},
            {path: 'connections', component: ConnectionsComponent},
            {path: 'privacy-policy', component: PrivacyPolicyComponent},
            {path: 'terms-conditions', component: TermsConditionsComponent}
        ]
    },

    

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];