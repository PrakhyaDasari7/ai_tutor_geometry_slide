const mockData = [
  {
    questionIndex: 1,
    problemStatement: "Two radii OA and OB form a 60° angle in a circle. The radius length is 5 cm.",
    subQuestions: [
      {
        index: 'a',
        statement: "Find the length of arc AB.",
        diagramDetails: "Circle with two radii forming a 60° angle.",
        diagramPath: "/diagrams/circle.svg",
        tutoringDialogues: [
          { index: 1, text: "To find the length of arc AB, we use the formula: θ by 360 times 2πr." },
          { index: 2, text: "Here, θ = 60° and r = 5 cm." },
          { index: 3, text: "Substitute the values to calculate the arc length." },
        
        ]
      },
      {
        index: 'b',
        statement: "What fraction of the circle’s circumference does arc AB represent?",
        diagramDetails: "Circle with two radii forming a 60° angle.",
        diagramPath: "/diagrams/circle.svg",
        tutoringDialogues: [
          { index: 1, text: "The fraction of the circle’s circumference is given by θ/360." },
          { index: 2, text: "Here, θ = 60°." },
          { index: 3, text: "Simplify the fraction to get the result." }
        ]
      }
    ]
  },
  {
    questionIndex: 2,
    problemStatement: "A rectangle has a length of 10 cm and a width of 6 cm.",
    subQuestions: [
      {
        index: 'a',
        statement: "Find the area of the rectangle.",
        diagramDetails: "Rectangle with labeled length and width.",
        diagramPath: "/diagrams/rectangle.svg",
        tutoringDialogues: [
          { index: 1, text: "The area of a rectangle is calculated using the formula: length × width." },
          { index: 2, text: "Here, length = 10 cm and width = 6 cm." },
          { index: 3, text: "Multiply the values to find the area." }
        ]
      },
      {
        index: 'b',
        statement: "Find the perimeter of the rectangle.",
        diagramDetails: "Rectangle with labeled length and width.",
        diagramPath: "/diagrams/rectangle.svg",
        tutoringDialogues: [
          { index: 1, text: "The perimeter of a rectangle is calculated using the formula: 2 × (length + width)." },
          { index: 2, text: "Here, length = 10 cm and width = 6 cm." },
          { index: 3, text: "Substitute the values to calculate the perimeter." }
        ]
      }
    ]
  },
  {
    questionIndex: 3,
    problemStatement: "A triangle has sides of lengths 3 cm, 4 cm, and 5 cm.",
    subQuestions: [
      {
        index: 'a',
        statement: "Determine if the triangle is a right triangle.",
        diagramDetails: "Triangle with labeled side lengths.",
        diagramPath: "/diagrams/triangle.svg",
        tutoringDialogues: [
          { index: 1, text: "To check if the triangle is a right triangle, use the Pythagorean theorem formula: a² + b² = c²." },
          { index: 2, text: "Here, a = 3 cm, b = 4 cm, and c = 5 cm. 9+16=25" },
          { index: 3, text: "Hence, we verified if the equation holds true." }
        ]
      },
      {
        index: 'b',
        statement: "Find the area of the triangle.",
        diagramDetails: "Triangle with labeled side lengths.",
        diagramPath: "/diagrams/triangle.svg",
        tutoringDialogues: [
          { index: 1, text: "The area of a triangle is calculated using the formula: 0.5 × base × height." },
          { index: 2, text: "Here, base = 3 cm and height = 4 cm." },
          { index: 3, text: "Substitute the values to calculate the area." }
        ]
      }
    ]
  },
  {
    questionIndex: 4,
    problemStatement: "A square has a side length of 8 cm.",
    subQuestions: [
      {
        index: 'a',
        statement: "Find the area of the square.",
        diagramDetails: "Square with labeled side length.",
        diagramPath: "/diagrams/square.svg",
        tutoringDialogues: [
          { index: 1, text: "The area of a square is calculated using the formula: side × side." },
          { index: 2, text: "Here, side = 8 cm." },
          { index: 3, text: "Multiply the side length by itself to find the area." }
        ]
      },
      {
        index: 'b',
        statement: "Find the perimeter of the square.",
        diagramDetails: "Square with labeled side length.",
        diagramPath: "/diagrams/square.svg",
        tutoringDialogues: [
          { index: 1, text: "The perimeter of a square is calculated using the formula: 4 × side." },
          { index: 2, text: "Here, side = 8 cm." },
          { index: 3, text: "Multiply the side length by 4 to calculate the perimeter." }
        ]
      }
    ]
  }
];

export default mockData;