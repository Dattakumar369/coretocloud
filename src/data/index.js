// Course Structure - Main Index
// Each topic is in its own file for better organization

// Core Java - Basics
import javaIntroduction from './corejava/basics/JavaIntroduction';
import javaFeatures from './corejava/basics/JavaFeatures';
import javaEnvironmentSetup from './corejava/basics/JavaEnvironmentSetup';
import javaSyntax from './corejava/basics/JavaSyntax';
import javaVariables from './corejava/basics/JavaVariables';
import javaDataTypes from './corejava/basics/JavaDataTypes';
import javaOperators from './corejava/basics/JavaOperators';
import javaMethods from './corejava/basics/JavaMethods';
import javaKeywords from './corejava/basics/JavaKeywords';

// Core Java - Control Flow
import ifElse from './corejava/controlflow/IfElse';
import switchStatement from './corejava/controlflow/SwitchStatement';
import forLoop from './corejava/controlflow/ForLoop';
import whileLoop from './corejava/controlflow/WhileLoop';
import doWhileLoop from './corejava/controlflow/DoWhileLoop';
import breakContinue from './corejava/controlflow/BreakContinue';

// Core Java - OOPs
import oopsIntroduction from './corejava/oops/OopsIntroduction';
import classesObjects from './corejava/oops/ClassesObjects';
import constructors from './corejava/oops/Constructors';
import inheritance from './corejava/oops/Inheritance';
import polymorphism from './corejava/oops/Polymorphism';
import abstraction from './corejava/oops/Abstraction';
import encapsulation from './corejava/oops/Encapsulation';
import interfaces from './corejava/oops/Interfaces';

// Core Java - Strings
import stringIntroduction from './corejava/strings/StringIntroduction';
import stringMethods from './corejava/strings/StringMethods';
import stringBuffer from './corejava/strings/StringBuffer';
import stringBuilder from './corejava/strings/StringBuilder';

// Core Java - Arrays
import arrayIntroduction from './corejava/arrays/ArrayIntroduction';
import singleDimensionalArray from './corejava/arrays/SingleDimensionalArray';
import multiDimensionalArray from './corejava/arrays/MultiDimensionalArray';
import arrayMethods from './corejava/arrays/ArrayMethods';

// Core Java - Exception Handling
import exceptionIntroduction from './corejava/exceptions/ExceptionIntroduction';
import tryCatchFinally from './corejava/exceptions/TryCatchFinally';
import throwThrows from './corejava/exceptions/ThrowThrows';
import customExceptions from './corejava/exceptions/CustomExceptions';

// Core Java - Collections
import collectionIntroduction from './corejava/collections/CollectionIntroduction';
import listInterface from './corejava/collections/ListInterface';
import setInterface from './corejava/collections/SetInterface';
import mapInterface from './corejava/collections/MapInterface';
import queueInterface from './corejava/collections/QueueInterface';

// Core Java - Synchronization & Serialization
import synchronization from './corejava/advanced/Synchronization';
import serialization from './corejava/advanced/Serialization';

// Core Java - Multithreading
import threadIntroduction from './corejava/multithreading/ThreadIntroduction';
import threadCreation from './corejava/multithreading/ThreadCreation';
import threadLifecycle from './corejava/multithreading/ThreadLifecycle';
import threadMethods from './corejava/multithreading/ThreadMethods';

// JDBC
import jdbcIntroduction from './jdbc/JdbcIntroduction';
import jdbcDrivers from './jdbc/JdbcDrivers';
import jdbcConnectionSteps from './jdbc/JdbcConnectionSteps';
import statementInterface from './jdbc/StatementInterface';
import preparedStatementInterface from './jdbc/PreparedStatementInterface';
import resultSetInterface from './jdbc/ResultSetInterface';
import crudOperations from './jdbc/CrudOperations';
import transactionManagement from './jdbc/TransactionManagement';

// Servlets
import servletIntroduction from './servlets/ServletIntroduction';
import servletLifecycle from './servlets/ServletLifecycle';
import servletAPI from './servlets/ServletAPI';
import servletConfig from './servlets/ServletConfig';
import httpServletRequestResponse from './servlets/HttpServletRequestResponse';
import sessionManagement from './servlets/SessionManagement';
import filtersListeners from './servlets/FiltersListeners';
import servletAnnotations from './servlets/ServletAnnotations';
import servletSecurity from './servlets/ServletSecurity';

// JSP
import jspIntroduction from './jsp/JspIntroduction';
import jspArchitecture from './jsp/JspArchitecture';
import jspScriptingElements from './jsp/JspScriptingElements';
import jspDirectives from './jsp/JspDirectives';
import jspImplicitObjects from './jsp/JspImplicitObjects';
import jspActionTags from './jsp/JspActionTags';
import jspExpressionLanguage from './jsp/JspExpressionLanguage';
import jspJSTL from './jsp/JspJSTL';
import jspCustomTags from './jsp/JspCustomTags';

export const courseStructure = {
  corejava: {
    title: "Core Java",
    icon: "☕",
    color: "#f89820",
    sections: {
      basics: {
        title: "Java Basics",
        topics: [
          javaIntroduction,
          javaFeatures,
          javaEnvironmentSetup,
          javaSyntax,
          javaVariables,
          javaDataTypes,
          javaOperators,
          javaMethods,
          javaKeywords
        ]
      },
      controlflow: {
        title: "Control Flow Statements",
        topics: [
          ifElse,
          switchStatement,
          forLoop,
          whileLoop,
          doWhileLoop,
          breakContinue
        ]
      },
      oops: {
        title: "Object-Oriented Programming",
        topics: [
          oopsIntroduction,
          classesObjects,
          constructors,
          inheritance,
          polymorphism,
          abstraction,
          encapsulation,
          interfaces
        ]
      },
      strings: {
        title: "Strings",
        topics: [
          stringIntroduction,
          stringMethods,
          stringBuffer,
          stringBuilder
        ]
      },
      arrays: {
        title: "Arrays",
        topics: [
          arrayIntroduction,
          singleDimensionalArray,
          multiDimensionalArray,
          arrayMethods
        ]
      },
      exceptions: {
        title: "Exception Handling",
        topics: [
          exceptionIntroduction,
          tryCatchFinally,
          throwThrows,
          customExceptions
        ]
      },
      collections: {
        title: "Collections Framework",
        topics: [
          collectionIntroduction,
          listInterface,
          setInterface,
          mapInterface,
          queueInterface
        ]
      },
      advanced: {
        title: "Synchronization & Serialization",
        topics: [
          synchronization,
          serialization
        ]
      },
      multithreading: {
        title: "Multithreading",
        topics: [
          threadIntroduction,
          threadCreation,
          threadLifecycle,
          threadMethods
        ]
      }
    }
  },
  jdbc: {
    title: "JDBC",
    icon: "🗄️",
    color: "#4479A1",
    sections: {
      basics: {
        title: "JDBC Fundamentals",
        topics: [
          jdbcIntroduction,
          jdbcDrivers,
          jdbcConnectionSteps
        ]
      },
      statements: {
        title: "Statements & ResultSet",
        topics: [
          statementInterface,
          preparedStatementInterface,
          resultSetInterface
        ]
      },
      operations: {
        title: "Database Operations",
        topics: [
          crudOperations,
          transactionManagement
        ]
      }
    }
  },
  servlets: {
    title: "Servlets",
    icon: "🌐",
    color: "#E76F00",
    sections: {
      basics: {
        title: "Servlet Basics",
        topics: [
          servletIntroduction,
          servletLifecycle,
          servletAPI
        ]
      },
      configuration: {
        title: "Configuration",
        topics: [
          servletConfig,
          servletAnnotations
        ]
      },
      requestResponse: {
        title: "Request & Response",
        topics: [
          httpServletRequestResponse,
          sessionManagement
        ]
      },
      advanced: {
        title: "Advanced Topics",
        topics: [
          filtersListeners,
          servletSecurity
        ]
      }
    }
  },
  jsp: {
    title: "JSP",
    icon: "📄",
    color: "#5382A1",
    sections: {
      basics: {
        title: "JSP Fundamentals",
        topics: [
          jspIntroduction,
          jspArchitecture,
          jspScriptingElements
        ]
      },
      directives: {
        title: "Directives & Implicit Objects",
        topics: [
          jspDirectives,
          jspImplicitObjects
        ]
      },
      actions: {
        title: "Action Tags",
        topics: [
          jspActionTags
        ]
      },
      el: {
        title: "Expression Language & JSTL",
        topics: [
          jspExpressionLanguage,
          jspJSTL
        ]
      },
      advanced: {
        title: "Custom Tags",
        topics: [
          jspCustomTags
        ]
      }
    }
  }
  // Future: hibernate, spring, springmvc, springboot, springcloud
};

// Helper function to get all topics as flat array
export const getAllTopics = () => {
  const topics = [];
  Object.entries(courseStructure).forEach(([courseKey, course]) => {
    Object.entries(course.sections).forEach(([sectionKey, section]) => {
      section.topics.forEach(topic => {
        topics.push({
          ...topic,
          courseKey,
          sectionKey,
          courseTitle: course.title,
          sectionTitle: section.title
        });
      });
    });
  });
  return topics;
};

// Helper function to get topic by ID
export const getTopicById = (topicId) => {
  return getAllTopics().find(t => t.id === topicId);
};

// Helper function to get navigation (prev/next)
export const getNavigation = (topicId) => {
  const topics = getAllTopics();
  const currentIndex = topics.findIndex(t => t.id === topicId);
  return {
    prev: currentIndex > 0 ? topics[currentIndex - 1] : null,
    next: currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null
  };
};

export default courseStructure;



