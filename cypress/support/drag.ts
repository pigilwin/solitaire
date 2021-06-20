class DndSimulatorDataTransfer {
    data: any = {};
  
    dropEffect: string = 'move';
  
    effectAllowed: string = 'all';
    files: string[] = [];
    items: string[] = [];
    types: string[] = [];
  
    clearData(format: string) {
      if (format) {
        delete this.data[format]
  
        const index = this.types.indexOf(format)
        delete this.types[index]
        delete this.data[index]
      } else {
        this.data = {}
      }
    }
  
    setData(format: string, data: any) {
      this.data[format] = data
      this.items.push(data)
      this.types.push(format)
    }
  
    getData(format: string) {
      if (format in this.data) {
        return this.data[format]
      }
  
      return ''
    }
}

Cypress.Commands.add('dragToHere', (drag: string, drop: string) => {
    
    const dataTransfer = new DndSimulatorDataTransfer();
    
    cy.dataCy(drag)
        .trigger('dragstart', {
            dataTransfer
        })
        .trigger('drag', {
            force: true
        });
    
    cy.dataCy(drop).then((droppableElement) => {
        const {x, y} = droppableElement.get()[0].getBoundingClientRect();

        cy.wrap(droppableElement)
            .trigger('dragover', {
                dataTransfer,
            })
            .trigger('drop', {
                dataTransfer,
                clientX: x,
                clientY: y,
            });
    });
});