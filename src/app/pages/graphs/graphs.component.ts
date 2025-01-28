/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, computed, effect, ElementRef, inject, OnInit } from '@angular/core';
import * as d3 from 'd3';
import dayjs from 'dayjs';
import { StatsService } from '../../services/stats.service';
import { LoadingComponent } from '../../components/loading/loading.component';

interface ActivityNode {
  name?: string;
  value?: number;
  children?: ActivityNode[];
}

@Component({
  selector: 'app-graphs',
  imports: [LoadingComponent],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css'
})
export class GraphsComponent implements OnInit {

  private stats = inject(StatsService)
  private elementRef = inject(ElementRef)

  activities = this.stats.activities

  activitiesByYearsAndMonth = computed(() => {
      const res: ActivityNode = {
        name: 'Activités',
        children: [
          {name: 'Activités', value: 0}
        ]
      }

      const activities = this.activities()

      if (activities) {
        for (const activity of activities) {
          if (activity.start_date) {
            const activityDate = dayjs(activity.start_date);
            const year = activityDate.year().toString();
            const month = activityDate.format('MMM');
            const type = activity.sport_type;

            let typeIndex = res.children?.findIndex((child: ActivityNode) => child.name === type);
            if (typeIndex === -1 || typeIndex === undefined) {
              res.children?.push({
                name: type,
                children: [
                  {name: type, value: 0}
                ]
              });
              typeIndex = res.children!.length - 1;
            }

            let yearIndex = res.children![typeIndex].children?.findIndex((child: ActivityNode) => child.name === year);
            if (yearIndex === -1 || yearIndex === undefined) {
              res.children![typeIndex].children?.push({
                name: year,
                children: [
                   {name: year, value: 0}
                ]
              });
              yearIndex = res.children![typeIndex].children!.length - 1;
            }

            const monthIndex = res.children![typeIndex].children![yearIndex].children?.findIndex((child: ActivityNode) => child.name === month);
            if (monthIndex === -1 || monthIndex === undefined) {
              res.children![typeIndex].children![yearIndex].children?.push({
                name: month,
                value: 1
              });
            } else {
              res.children![typeIndex].children![yearIndex].children![monthIndex].value!++;
            }
            res.children![0].value!++;
            res.children![typeIndex].children![0].value!++;
            res.children![typeIndex].children![yearIndex].children![0].value!++;
          }
        }
      }
      return res
    })

  constructor() {
    dayjs.locale('fr');
    effect(() => {
      this.activitiesByYearsAndMonth()
      this.updateChart();
    });
  }

  ngOnInit() {
    this.updateChart();
  }


  private updateChart(): void {
      // Specify the dimensions of the chart.
      const width = 800;
      const height = 800;
      const margin = 20;
      // Specify the number format for values.
      const format = d3.format(",d");

      const pack = d3.pack()
          .size([width - margin * 2, height - margin * 2])
          .padding(3);

      const root = pack(d3.hierarchy(this.activitiesByYearsAndMonth() as unknown)
                      .sum((d: any) => d.value || 0)
                      .sort((a: d3.HierarchyNode<unknown>, b: d3.HierarchyNode<unknown>) => (b.value || 0) - (a.value || 0)));

      // Create the SVG container.
      const svg = d3.select(this.elementRef.nativeElement).select("svg")
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'width: 100%; height: auto; font: 10px sans-serif;')
      .attr('text-anchor', 'middle');

      // Place each node according to the layout’s x and y values.
      const node = svg.append('g')
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .on('click', (event, d) => zoom(event, d));

      // Add a title.
      node.append("title")
          .text((d:any) => `${d.ancestors().map((d:any) => d.data.name).reverse().join("/")}\n${format(d.value)}`);

      const color = d3.scaleSequential(d3.interpolateBlues)
      .domain([root.height, 0]);


      // Add a filled or stroked circle.
      node.append("circle")
          .attr("fill", d => color(d.depth))
          .attr("r", d => d.r || 0);

      // Add a label to leaf nodes.
      const text = node.filter(d => !d.children)
        .append("text")
        .attr('font-size', (d: any) => `${Math.min(2 * d.r, (2 * d.r - 8) / this.getTextWidth(d.data.name, '10px sans-serif') * 5)}px`)
        // .attr("clip-path", d => `circle(${d.r})`)
        .style('opacity', d => d.r > 20 ? 1 : 0);

      // Add a tspan for each CamelCase-separated word.
      text.selectAll()
        .data((d: any) => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
        .join("tspan")
          .attr("x", 0)
          .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
          .text((d:any) => d);

      // Add a tspan for the node’s value.
      text.append("tspan")
          .attr("x", 0)
          .attr("y", (d: any) => `${d.data.name.split(/(?=[A-Z][a-z])|\s+/g).length / 2 + 0.35}em`)
          .text((d:any) => format(d.value));


      let focus = root;
      let view: [number, number, number] = [width / 2, height / 2, width];


      const zoom = (event: Event, d: any) => {
        focus = d;
        svg.transition()
          .duration(750)
          .tween('zoom', () => {
            const i:d3.ZoomInterpolator = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
          });


        const zoomTo = (v: d3.ZoomView) => {
          const k = width / v[2];
          view = v;
          node.attr('transform', d => `translate(${(d.x - v[0]) * k + width / 2},${(d.y - v[1]) * k + height / 2})`);
          node.select('circle').attr('r', d => d.r * k);
          text.style('opacity', d => d.r * k > 20 ? 1 : 0)
              .style('font-size', (d: any) => `${Math.min(2 * d.r * k, (2 * d.r * k - 8) / this.getTextWidth(d.data.name, '10px sans-serif') * 5)}px`); // Adjust font size

        }
      }
  }
  private getTextWidth(text: string, font: string): number {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      context.font = font;
      return context.measureText(text).width;
    }
    return 0;
  }
}
