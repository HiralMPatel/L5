// models/todo.js
"use strict";
const { Model } = require("sequelize");
const { Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    
    static async showList() {
      console.log("My Todo list \n");
                 
      console.log("Overdue");
      // FILL IN HERE
      const over=await Todo.overdue();
      //console.log(over);
      const overitemList = over.map((todo)=>todo.displayableString()).join('\n');
      console.log(overitemList);
      
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const tod=await Todo.dueToday();
      const toditemList = tod.map((todo)=>todo.displayableString()).join('\n');
      console.log(toditemList);
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const later=await Todo.dueLater();
      const lateritemList = later.map((todo)=>todo.displayableString()).join('\n');
      console.log(lateritemList);
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      return await Todo.findAll({
          where: {
              dueDate: {
                  [Op.lt]: new Date(),
                }
              },
              order: [
                ['id', 'ASC'],
           ]
          
        });
       // console.log(Todo.displayableString());
     
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      return await Todo.findAll({
        where: {
            dueDate: {
                [Op.eq]: new Date(),
              }
            },
            order: [
                 ['id', 'ASC'],
            ]
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      return await Todo.findAll({
        where: {
            dueDate: {
                [Op.gt]: new Date(),
              }
            },
            order: [
              ['id', 'ASC'],
         ]
        
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      try{
          const todo = await Todo.update({completed:true},{
            where: {
              [Op.and]: [
                { id: id },
                { completed: false }
              ]
            }
          });
          //console.log(todo.displayableString);
      }
      catch(error)
      {
        console.error(error);
      }
     
    }
    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let checkdate=this.dueDate===new Date().toLocaleDateString("en-CA")?" ":`${this.dueDate}`;
      return `${this.id}. ${checkbox} ${this.title} ${checkdate}`.trim();
    }
   
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
