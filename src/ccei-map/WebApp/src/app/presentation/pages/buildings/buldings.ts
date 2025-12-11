import { Component, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "@components/index";
import { BuldingsList } from "./components/buildings-list";
import { Building, Space } from "@domain/entities";
import { BuildingsController } from "@controllers/buildings-controller";

@Component({
  selector: "app-buldings",
  imports: [HeaderComponent, BuldingsList],
  providers: [BuildingsController],
  templateUrl: "./buldings.html",
  styleUrl: "./buldings.scss",
})
export class Buldings implements OnInit {
  buildings: Building[] = [];
  spaces: Space[] = [];
  private readonly controller = inject(BuildingsController);

  ngOnInit(): void {
    this.loadBuildings();
  }

  private loadBuildings(): void {
    this.buildings = this.controller.getAllBuildings();
  }
}
