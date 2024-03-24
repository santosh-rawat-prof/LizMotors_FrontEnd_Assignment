import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import { themeContext } from "./Context";
import ChartModal from "./Components/Modal/ChartModal";
import { modalData } from "./Components/Modal/ModalData";

const initialNodes = [
  {
    id: "start",
    sourcePosition: "right",
    type: "input",
    data: { label: "" },
    position: { x: 0, y: 348 },
    style: {
      width: 0,
      height: 0,
      outline: "none",
      border: "none",
      background: "transparent",
    },
  },
  {
    id: "research",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Research" },
    position: { x: 150, y: 120 },
    style: {
      background: "#2a4494",
      color: "#f5f5f5",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "research-external",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "External" },
    position: { x: 420, y: 100 },
    style: {
      background: "#2a4494",
      color: "#f5f5f5",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "research-external-b2c1",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "B2C" },
    position: { x: 670, y: 80 },

    style: {
      background: "#2a4494",
      color: "#f5f5f5",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "research-external-b2c1-online",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Online" },
    position: { x: 920, y: 0 },

    style: {
      background: "#2a4494",
      color: "#f5f5f5",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "research-external-b2c1-interview",
    targetPosition: "left",
    type: "output",
    data: { label: "Interview" },
    position: { x: 920, y: 60 },
    style: {
      background: "#2a4494",
      color: "#f5f5f5",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "research-external-b2c1-public",
    targetPosition: "left",
    type: "output",
    data: { label: "Public Data" },
    position: { x: 920, y: 110 },
    style: {
      background: "#2a4494",
      color: "#f5f5f5",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "research-external-b2c1-health",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Health" },
    position: { x: 920, y: 160 },
    style: {
      background: "#2a4494",
      color: "#f5f5f5",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "online-health",
    targetPosition: "left",
    type: "output",
    data: { label: "" },
    position: { x: 1220, y: 80 },
    style: {
      width: 0,
      height: 0,
      outline: "none",
      border: "none",
      background: "transparent",
    },
  },
  {
    id: "research-external-b2c2",
    targetPosition: "left",
    type: "output",
    data: { label: "B2C" },
    position: { x: 670, y: 130 },
    style: {
      background: "#2a4494",
      color: "#f5f5f5",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "research-internal",
    targetPosition: "left",
    type: "output",
    data: { label: "Internal" },
    position: { x: 420, y: 150 },
    style: {
      background: "#2a4494",
      color: "#f5f5f5",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "planning",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Planning" },
    position: { x: 150, y: 230 },
    style: {
      background: "#82b3e8",
      color: "#1B1C1E",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "planning-prd",
    targetPosition: "left",
    type: "output",
    data: { label: "PRD" },
    position: { x: 420, y: 210 },
    style: {
      background: "#82b3e8",
      color: "#1B1C1E",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "planning-specs",
    targetPosition: "left",
    type: "output",
    data: { label: "Specs" },
    position: { x: 420, y: 260 },
    style: {
      background: "#82b3e8",
      color: "#1B1C1E",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "designing",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Designing" },
    position: { x: 150, y: 340 },
    style: {
      background: "#e86343",
      color: "#1B1C1E",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "designing-hardware",
    targetPosition: "left",
    type: "output",
    data: { label: "Hardware" },
    position: { x: 420, y: 320 },
    style: {
      background: "#e86343",
      color: "#1B1C1E",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "designing-software",
    targetPosition: "left",
    type: "output",
    data: { label: "Software" },
    position: { x: 420, y: 370 },
    style: {
      background: "#e86343",
      color: "#1B1C1E",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "manufacturing",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Manufacturing" },
    position: { x: 150, y: 450 },
    style: {
      background: "#e8919d",
      color: "#1B1C1E",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "manufacturing-material",
    targetPosition: "left",
    type: "output",
    data: { label: "Material" },
    position: { x: 420, y: 430 },
    style: {
      background: "#e8919d",
      color: "#1B1C1E",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "manufacturing-production",
    targetPosition: "left",
    type: "output",
    data: { label: "Production" },
    position: { x: 420, y: 480 },
    style: {
      background: "#e8919d",
      color: "#1B1C1E",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "marketing",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Sales/Marketing" },
    position: { x: 150, y: 560 },
    style: {
      background: "#a684eb",
      color: "#1B1C1E",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "marketing-online",
    targetPosition: "left",
    type: "output",
    data: { label: "Online" },
    position: { x: 420, y: 540 },
    style: {
      background: "#a684eb",
      color: "#1B1C1E",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
  {
    id: "marketing-dealership",
    targetPosition: "left",
    type: "output",
    data: { label: "Dealership" },
    position: { x: 420, y: 590 },
    style: {
      background: "#a684eb",
      color: "#1B1C1E",
      fontSize: "15px",
      padding: ".4rem",
      outline: "none",
      border: "none",
    },
  },
];

const initialEdges = [
  {
    id: "e-research",
    source: "start",
    type: "smoothstep",
    target: "research",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-external",
    source: "research",
    type: "smoothstep",
    target: "research-external",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-b2c1",
    source: "research-external",
    type: "smoothstep",
    target: "research-external-b2c1",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-online",
    source: "research-external-b2c1",
    type: "smoothstep",
    target: "research-external-b2c1-online",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-interview",
    source: "research-external-b2c1",
    type: "smoothstep",
    target: "research-external-b2c1-interview",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-public",
    source: "research-external-b2c1",
    type: "smoothstep",
    target: "research-external-b2c1-public",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-health",
    source: "research-external-b2c1",
    type: "smoothstep",
    target: "research-external-b2c1-health",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "online-e",
    source: "research-external-b2c1-online",
    type: "smoothstep",
    target: "online-health",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "health-e",
    source: "research-external-b2c1-health",
    type: "smoothstep",
    target: "online-health",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-b2c2",
    source: "research-external",
    type: "smoothstep",
    target: "research-external-b2c2",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-internal",
    source: "research",
    type: "smoothstep",
    target: "research-internal",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-planning",
    source: "start",
    type: "smoothstep",
    target: "planning",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-prd",
    source: "planning",
    type: "smoothstep",
    target: "planning-prd",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-specs",
    source: "planning",
    type: "smoothstep",
    target: "planning-specs",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-designing",
    source: "start",
    type: "smoothstep",
    target: "designing",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-hardware",
    source: "designing",
    type: "smoothstep",
    target: "designing-hardware",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-software",
    source: "designing",
    type: "smoothstep",
    target: "designing-software",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-manufacturing",
    source: "start",
    type: "smoothstep",
    target: "manufacturing",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-material",
    source: "manufacturing",
    type: "smoothstep",
    target: "manufacturing-material",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-production",
    source: "manufacturing",
    type: "smoothstep",
    target: "manufacturing-production",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-marketing",
    source: "start",
    type: "smoothstep",
    target: "marketing",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-marketing-online",
    source: "marketing",
    type: "smoothstep",
    target: "marketing-online",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
  {
    id: "e-dealership",
    source: "marketing",
    type: "smoothstep",
    target: "marketing-dealership",
    style: {
      stroke: "#1B1C1E",
      strokeWidth: 1,
    },
  },
];

const DashBoard = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [activeModal, setActiveModal] = useState(null);

  const modalRef = useRef();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  useEffect(() => {
    // Update edge styles based on darkMode
    const updatedEdges = initialEdges.map((edge) => ({
      ...edge,
      style: {
        ...edge.style,
        stroke: darkMode ? "#f5f5f5" : "#1B1C1E",
      },
    }));

    // Use setEdges to update edges state
    setEdges(updatedEdges);
  }, [darkMode]);

  useEffect(() => {
    // Close modal when clicking outside of it
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setActiveModal(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleNodeClick = (event, node) => {
    const modalId = node.id;
    setActiveModal(modalId); // Set active modal based on clicked node
  };

  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is smaller than or equal to 768 pixels
      if (window.innerWidth <= 768) {
        const updatedNodes = nodes.map((node) => {
          switch (node.id) {
            case "start":
              return {
                ...node,
                position: { x: 220, y: -400 },
                sourcePosition: "bottom",
              };
            case "research":
              return {
                ...node,
                position: { x: 280, y: -250 },
              };
            case "research-external":
              return {
                ...node,
                position: { x: 550, y: -200 },
              };
            case "research-external-b2c1":
              return {
                ...node,
                position: { x: 750, y: -150 },
                sourcePosition: "bottom",
              };
            case "research-external-b2c1-online":
              return {
                ...node,
                position: { x: 280, y: -50 },
                sourcePosition: "bottom",
                targetPosition: "top",
              };
            case "research-external-b2c1-interview":
              return {
                ...node,
                position: { x: 470, y: -50 },
                sourcePosition: "bottom",
                targetPosition: "top",
              };
            case "research-external-b2c1-public":
              return {
                ...node,
                position: { x: 660, y: -50 },
                sourcePosition: "bottom",
                targetPosition: "top",
              };
            case "research-external-b2c1-health":
              return {
                ...node,
                position: { x: 850, y: -50 },
                sourcePosition: "bottom",
                targetPosition: "top",
              };
            case "online-health":
              return {
                ...node,
                position: { x: 500, y: 50 },
                sourcePosition: "bottom",
                targetPosition: "top",
              };
            case "research-external-b2c2":
              return {
                ...node,
                position: { x: 750, y: -300 },
              };
            case "research-internal":
              return {
                ...node,
                position: { x: 550, y: -300 },
              };
            case "planning":
              return {
                ...node,
                position: { x: 280, y: 100 },
              };
            case "planning-prd":
              return {
                ...node,
                position: { x: 550, y: 50 },
              };
            case "planning-specs":
              return {
                ...node,
                position: { x: 550, y: 150 },
              };
            case "designing":
              return {
                ...node,
                position: { x: 280, y: 300 },
              };
            case "designing-hardware":
              return {
                ...node,
                position: { x: 550, y: 250 },
              };
            case "designing-software":
              return {
                ...node,
                position: { x: 550, y: 350 },
              };
            case "manufacturing":
              return {
                ...node,
                position: { x: 280, y: 500 },
              };
            case "manufacturing-material":
              return {
                ...node,
                position: { x: 550, y: 450 },
              };
            case "manufacturing-production":
              return {
                ...node,
                position: { x: 550, y: 550 },
              };
            case "marketing":
              return {
                ...node,
                position: { x: 280, y: 700 },
              };
            case "marketing-online":
              return {
                ...node,
                position: { x: 550, y: 650 },
              };
            case "marketing-dealership":
              return {
                ...node,
                position: { x: 550, y: 750 },
              };
            default:
              return node;
          }
        });
        setNodes(updatedNodes);
      }
    };

    handleResize(); // Call the function initially

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // console.log(modalData[activeModal]);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeClick={handleNodeClick}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
      ></ReactFlow>
      {activeModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-15 backdrop-blur-sm z-[1000]">
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 max-md:min-w-[20rem] md:min-w-[40rem] shadow rounded-lg`}
            style={
              darkMode ? { background: "#1B1C1E" } : { background: "#F5F5F5" }
            }
            ref={modalRef}
          >
            <h2
              className={`text-center mb-10 font-bold text-2xl`}
              style={
                darkMode
                  ? { color: "#f5f5f5" }
                  : { color: modalData[activeModal].color }
              }
            >
              {modalData[activeModal].name} Reviews
            </h2>
            <ChartModal
              seriesColor={modalData[activeModal].color}
              seriesData={[
                modalData[activeModal].positiveReviews,
                modalData[activeModal].negativeReviews,
                modalData[activeModal].comments,
              ]}
            />
            <div className="font-medium text-sm md:w-1/3">
              <h3 className="flex justify-between">
                Total Reviews:{" "}
                <span>{modalData[activeModal].totalReviews}</span>
              </h3>
              <h3 className="flex justify-between">
                Positive Reviews:{" "}
                <span>{modalData[activeModal].positiveReviews}</span>
              </h3>
              <h3 className="flex justify-between">
                Negative Reviews:{" "}
                <span>{modalData[activeModal].negativeReviews}</span>
              </h3>
              <h3 className="flex justify-between">
                Comments: <span>{modalData[activeModal].comments}</span>
              </h3>
            </div>
          </div>
          <h3 className="absolute top-4 right-1/4 text-center left-1/4 text-md font-bold animate-pulse">
            Click Anywhere Outside Popup to Close
          </h3>
        </div>
      )}
    </>
  );
};

export default DashBoard;
