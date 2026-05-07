package query

import "strings"

// ToSQL converts e to a parameterized SQL WHERE fragment and its bound
// arguments. The fragment does not include the WHERE keyword and uses ?
// placeholders. Returns empty string and nil args for a nil expression.
func ToSQL(e Expr) (clause string, args []any) {
	if e == nil {
		return "", nil
	}
	return exprToSQL(e)
}

func exprToSQL(e Expr) (string, []any) {
	switch ex := e.(type) {
	case BareExpr:
		v := "%" + strings.ToLower(ex.Value) + "%"
		clause := "(LOWER(COALESCE(title,'')) LIKE ? OR LOWER(COALESCE(authors,'')) LIKE ? OR LOWER(filename) LIKE ? OR SUBSTR(COALESCE(publication_date,''),1,4) LIKE ?)"
		return clause, []any{v, v, v, v}
	case FieldExpr:
		v := "%" + strings.ToLower(ex.Value) + "%"
		switch ex.Field {
		case "author", "authors", "creator", "creators":
			return "(LOWER(COALESCE(authors,'')) LIKE ? OR LOWER(filename) LIKE ?)", []any{v, v}
		case "title":
			return "LOWER(COALESCE(title,'')) LIKE ?", []any{v}
		case "year":
			return "SUBSTR(COALESCE(publication_date,''),1,4) LIKE ?", []any{v}
		case "filename":
			return "LOWER(filename) LIKE ?", []any{v}
		default:
			return "0", nil
		}
	case AndExpr:
		var parts []string
		var allArgs []any
		for _, op := range ex.Operands {
			c, a := exprToSQL(op)
			parts = append(parts, c)
			allArgs = append(allArgs, a...)
		}
		return "(" + strings.Join(parts, " AND ") + ")", allArgs
	case OrExpr:
		var parts []string
		var allArgs []any
		for _, op := range ex.Operands {
			c, a := exprToSQL(op)
			parts = append(parts, c)
			allArgs = append(allArgs, a...)
		}
		return "(" + strings.Join(parts, " OR ") + ")", allArgs
	}
	return "1", nil
}
