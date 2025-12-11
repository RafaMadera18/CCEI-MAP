import { Component } from "@angular/core";
import { HeaderComponent } from "@components/header/header.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-help",
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: "./help.html",
  styleUrl: "./help.scss",
})
export class HelpPage {}
